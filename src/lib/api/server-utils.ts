import { Paginated } from "./types";

export function wait(min = 150, max = 400) {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function nowIso() {
  return new Date().toISOString();
}

export function paginate<T>(
  rows: T[],
  page = 1,
  pageSize = 10,
): Paginated<T> {
  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const data = rows.slice(start, start + pageSize);
  return { data, page, pageSize, total, totalPages };
}
