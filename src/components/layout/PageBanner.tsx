import Image from "next/image";
import { Link } from "@/i18n/navigation";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  image: string;
  title: string;
  description?: string;
  breadcrumb?: BreadcrumbItem[];
}

export default function PageBanner({
  image,
  title,
  description,
  breadcrumb,
}: Props) {
  return (
    <section className="relative flex h-85 items-end overflow-hidden bg-ocean-950 md:h-175">
      <Image
        fill
        priority
        src={image}
        alt=""
        aria-hidden
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-ocean-950 via-ocean-950/60 to-ocean-950/20" />

      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_bottom,transparent_0%,var(--background)_100%)] md:h-64"
      /> */}

      <div className="relative container mx-auto px-4 pb-10 md:pb-28">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="mb-4 flex items-center gap-2 text-white/60">
            {breadcrumb.map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden>/</span>}
                {item.href ? (
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="text-white">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-white/70">{description}</p>
        )}
      </div>
    </section>
  );
}
