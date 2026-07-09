import { getBaseUrl } from "./base-url";
import {
  Activity,
  BlogPost,
  Boat,
  Booking,
  BookingStatus,
  ContactInfo,
  Course,
  CreateInput,
  ListParams,
  Paginated,
  StaticPage,
  Trip,
  UpdateInput,
} from "./types";

interface StoredRow {
  id: string;
  slug?: string;
  createdAt: string;
  updatedAt: string;
}

function buildQuery(params: ListParams = {}) {
  const search = new URLSearchParams();
  if (params.page) search.set("page", String(params.page));
  if (params.pageSize) search.set("pageSize", String(params.pageSize));
  if (params.search) search.set("search", params.search);
  if (params.filters) {
    for (const [key, value] of Object.entries(params.filters)) {
      search.set(key, value);
    }
  }
  return search.toString();
}

/**
 * Generic REST client bound to one of our own Route Handlers under src/app/api/.
 *
 * SWAP POINT for the real Laravel backend: replace `${getBaseUrl()}/api/${path}`
 * below with `${process.env.LARAVEL_API_URL}/${path}` and add an `Authorization`
 * header to each fetch call — nothing about the calling code (pages/actions
 * using `api.courses.list()` etc.) needs to change.
 */
function buildEntityClient<T extends StoredRow>(path: string, tag: string) {
  const url = () => `${getBaseUrl()}/api/${path}`;

  return {
    async list(params: ListParams = {}): Promise<Paginated<T>> {
      const res = await fetch(`${url()}?${buildQuery(params)}`, {
        next: { tags: [tag], revalidate: 60 },
      });
      if (!res.ok) throw new Error(`Failed to list ${path}`);
      return res.json();
    },

    async get(id: string): Promise<T | null> {
      const res = await fetch(`${url()}/${id}`, {
        next: { tags: [tag], revalidate: 60 },
      });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`Failed to get ${path}/${id}`);
      return res.json();
    },

    async getBySlug(slug: string): Promise<T | null> {
      const res = await fetch(`${url()}/slug/${slug}`, {
        next: { tags: [tag], revalidate: 60 },
      });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`Failed to get ${path} by slug ${slug}`);
      return res.json();
    },

    async create(input: CreateInput<T>): Promise<T> {
      const res = await fetch(url(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Failed to create ${path}`);
      return res.json();
    },

    async update(id: string, input: UpdateInput<T>): Promise<T> {
      const res = await fetch(`${url()}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Failed to update ${path}/${id}`);
      return res.json();
    },

    async remove(id: string): Promise<void> {
      const res = await fetch(`${url()}/${id}`, {
        method: "DELETE",
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Failed to remove ${path}/${id}`);
    },
  };
}

function buildBookingsClient() {
  const url = () => `${getBaseUrl()}/api/bookings`;

  return {
    async list(
      params: ListParams & { status?: BookingStatus } = {},
    ): Promise<Paginated<Booking>> {
      const { status, ...rest } = params;
      const query = buildQuery({
        ...rest,
        filters: { ...rest.filters, ...(status ? { status } : {}) },
      });
      const res = await fetch(`${url()}?${query}`, {
        next: { tags: ["bookings"], revalidate: 60 },
      });
      if (!res.ok) throw new Error("Failed to list bookings");
      return res.json();
    },

    async get(id: string): Promise<Booking | null> {
      const res = await fetch(`${url()}/${id}`, {
        next: { tags: ["bookings"], revalidate: 60 },
      });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`Failed to get booking/${id}`);
      return res.json();
    },

    async updateStatus(id: string, status: BookingStatus): Promise<Booking> {
      const res = await fetch(`${url()}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Failed to update booking/${id} status`);
      return res.json();
    },
  };
}

function buildContactInfoClient() {
  const url = () => `${getBaseUrl()}/api/contact-info`;

  return {
    async get(): Promise<ContactInfo> {
      const res = await fetch(url(), {
        next: { tags: ["contact-info"], revalidate: 60 },
      });
      if (!res.ok) throw new Error("Failed to get contact info");
      return res.json();
    },

    async update(input: Partial<ContactInfo>): Promise<ContactInfo> {
      const res = await fetch(url(), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to update contact info");
      return res.json();
    },
  };
}

export const api = {
  courses: buildEntityClient<Course>("courses", "courses"),
  trips: buildEntityClient<Trip>("trips", "trips"),
  activities: buildEntityClient<Activity>("activities", "activities"),
  blogPosts: buildEntityClient<BlogPost>("blog-posts", "blog-posts"),
  staticPages: buildEntityClient<StaticPage>("static-pages", "static-pages"),
  boats: buildEntityClient<Boat>("boats", "boats"),
  bookings: buildBookingsClient(),
  contactInfo: buildContactInfoClient(),
};
