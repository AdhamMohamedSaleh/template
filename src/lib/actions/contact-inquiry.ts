"use server";

export interface ContactInquiryState {
  error?: string;
  success?: boolean;
}

// Mock submit — no real inbox/CRM wired up yet. Swap this out for a real
// provider (email/CRM webhook) later; the form doesn't need to change, only
// this function.
export async function submitContactInquiry(
  _prevState: ContactInquiryState,
  formData: FormData,
): Promise<ContactInquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !email.includes("@") || !message) {
    return { error: "invalid" };
  }

  await new Promise((resolve) => setTimeout(resolve, 400));

  return { success: true };
}
