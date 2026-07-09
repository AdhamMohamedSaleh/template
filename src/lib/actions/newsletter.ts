"use server";

export interface NewsletterState {
  error?: string;
  success?: boolean;
}

// Mock subscribe — no real email service wired up yet. Swap this out for a
// real provider (Mailchimp/ConvertKit/etc) later; the form doesn't need to
// change, only this function.
export async function subscribeToNewsletter(
  _prevState: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email || !email.includes("@")) {
    return { error: "invalid" };
  }

  await new Promise((resolve) => setTimeout(resolve, 400));

  return { success: true };
}
