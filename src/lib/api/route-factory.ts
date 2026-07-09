import { NextRequest, NextResponse } from "next/server";
import { nowIso, paginate, slugify, wait } from "./server-utils";

interface StoredRow {
  id: string;
  slug?: string;
  createdAt: string;
  updatedAt: string;
}

const RESERVED_PARAMS = new Set(["page", "pageSize", "search"]);

/** GET (list, paginated/searched/filtered) + POST (create) for an entity's in-memory store. */
export function createCollectionHandlers<T extends StoredRow>(
  store: T[],
  options: { titleForSlug?: (body: Partial<T>) => string } = {},
) {
  async function GET(request: NextRequest) {
    await wait();
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") ?? "1");
    const pageSize = Number(searchParams.get("pageSize") ?? "10");
    const search = searchParams.get("search")?.toLowerCase() ?? "";

    let rows = store;
    if (search) {
      rows = rows.filter((row) =>
        JSON.stringify(row).toLowerCase().includes(search),
      );
    }
    for (const [key, value] of searchParams.entries()) {
      if (RESERVED_PARAMS.has(key)) continue;
      rows = rows.filter(
        (row) => String((row as Record<string, unknown>)[key]) === value,
      );
    }

    return NextResponse.json(
      paginate(
        rows.map((row) => structuredClone(row)),
        page,
        pageSize,
      ),
    );
  }

  async function POST(request: NextRequest) {
    await wait();
    const body = (await request.json()) as Partial<T>;
    const id = crypto.randomUUID();
    const timestamp = nowIso();
    const slug =
      (body as { slug?: string }).slug ||
      slugify(options.titleForSlug?.(body) ?? id);
    const row = { ...body, id, slug, createdAt: timestamp, updatedAt: timestamp } as T;
    store.push(row);
    return NextResponse.json(structuredClone(row), { status: 201 });
  }

  return { GET, POST };
}

/** GET (single by id) + PATCH (update) + DELETE (remove) for an entity's in-memory store. */
export function createItemHandlers<T extends StoredRow>(store: T[]) {
  async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
  ) {
    await wait();
    const { id } = await params;
    const row = store.find((r) => r.id === id);
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(structuredClone(row));
  }

  async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
  ) {
    await wait();
    const { id } = await params;
    const index = store.findIndex((r) => r.id === id);
    if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const body = (await request.json()) as Partial<T>;
    store[index] = { ...store[index], ...body, id, updatedAt: nowIso() };
    return NextResponse.json(structuredClone(store[index]));
  }

  async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
  ) {
    await wait();
    const { id } = await params;
    const index = store.findIndex((r) => r.id === id);
    if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    store.splice(index, 1);
    return NextResponse.json({ ok: true });
  }

  return { GET, PATCH, DELETE };
}

/** GET (single by slug) — used by public detail pages. */
export function createSlugHandler<T extends StoredRow & { slug: string }>(
  store: T[],
) {
  async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ slug: string }> },
  ) {
    await wait();
    const { slug } = await params;
    const row = store.find((r) => r.slug === slug);
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(structuredClone(row));
  }

  return { GET };
}
