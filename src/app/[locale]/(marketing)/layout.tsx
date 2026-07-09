import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 md:pt-28">{children}</main>
      <Footer />
    </>
  );
}
