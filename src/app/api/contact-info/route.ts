import { NextRequest, NextResponse } from "next/server";
import { contactInfo } from "@/lib/data/contact-info";
import { nowIso, wait } from "@/lib/api/server-utils";
import type { ContactInfo } from "@/lib/api/types";

export async function GET() {
  await wait();
  return NextResponse.json(structuredClone(contactInfo));
}

export async function PATCH(request: NextRequest) {
  await wait();
  const body = (await request.json()) as Partial<ContactInfo>;
  Object.assign(contactInfo, body, { updatedAt: nowIso() });
  return NextResponse.json(structuredClone(contactInfo));
}
