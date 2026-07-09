import { routing } from "@/i18n/routing";

export type Locale = (typeof routing.locales)[number];
export type Translated<T> = Record<Locale, T>;

export interface Paginated<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  filters?: Record<string, string>;
}

interface StoredEntity {
  id: string;
  slug?: string;
  createdAt: string;
  updatedAt: string;
}

// slug is optional on create — the Route Handler auto-generates one from the
// title when omitted (see route-factory.ts's titleForSlug option).
export type CreateInput<T extends StoredEntity> = Omit<
  T,
  "id" | "createdAt" | "updatedAt" | "slug"
> & { slug?: string };
export type UpdateInput<T extends StoredEntity> = Partial<CreateInput<T>>;

export type CourseLevel = "beginner" | "advanced" | "professional";

export interface Course {
  id: string;
  slug: string;
  level: CourseLevel;
  priceUsd: number;
  durationDays: number;
  minAge?: number;
  maxDepthMeters?: number;
  images: string[];
  title: Translated<string>;
  summary: Translated<string>;
  description: Translated<string>;
  createdAt: string;
  updatedAt: string;
}

export type TripCategory = "day-trip" | "liveaboard" | "snorkeling";

export interface TripItineraryDay {
  day: number;
  title: Translated<string>;
  description: Translated<string>;
}

export interface TripCabinPricing {
  id: string;
  label: Translated<string>;
  priceUsd: number;
}

export interface Trip {
  id: string;
  slug: string;
  category: TripCategory;
  durationDays: number;
  images: string[];
  itinerary: TripItineraryDay[];
  cabinPricing: TripCabinPricing[];
  title: Translated<string>;
  summary: Translated<string>;
  description: Translated<string>;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  slug: string;
  priceUsd: number;
  durationHours: number;
  images: string[];
  title: Translated<string>;
  summary: Translated<string>;
  description: Translated<string>;
  createdAt: string;
  updatedAt: string;
}

export type BlogPostStatus = "draft" | "published";

export interface BlogPost {
  id: string;
  slug: string;
  coverImage: string;
  authorName: string;
  status: BlogPostStatus;
  publishedAt: string | null;
  title: Translated<string>;
  excerpt: Translated<string>;
  bodyMarkdown: Translated<string>;
  createdAt: string;
  updatedAt: string;
}

export interface StaticPage {
  id: string;
  slug: string;
  title: Translated<string>;
  bodyMarkdown: Translated<string>;
  createdAt: string;
  updatedAt: string;
}

// A specific liveaboard vessel — distinct from Trip, which models an
// itinerary/package. Shown on the /liveaboard fleet showcase page.
export interface Boat {
  id: string;
  slug: string;
  name: string;
  images: string[];
  lengthMeters: number;
  cabins: number;
  capacity: number;
  builtYear: number;
  amenities: Translated<string>[];
  summary: Translated<string>;
  description: Translated<string>;
  createdAt: string;
  updatedAt: string;
}

// Singleton — one record, edited from dashboard/settings, not a CRUD list.
export interface ContactInfo {
  phone: string;
  email: string;
  address: Translated<string>;
  hours: Translated<string>;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  tiktokUrl: string;
  updatedAt: string;
}

export type BookingItemType = "course" | "trip" | "activity";
export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  itemType: BookingItemType;
  itemId: string;
  itemLabel: string;
  date: string;
  guests: number;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
