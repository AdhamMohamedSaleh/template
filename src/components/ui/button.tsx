import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base — shared across all variants
  [
    "group/button inline-flex shrink-0 items-center justify-center gap-1.5",
    "rounded-xs border border-transparent",
    "text-base font-medium whitespace-nowrap",
    "outline-none select-none cursor-pointer",
    "transition-all duration-175 ease-in-out",
    // Focus
    "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50",
    // Icons
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        /*
         * primary — gold CTA button.
         * Main action on dark sections (hero, banners).
         */
        primary:
          "bg-gold text-gold-dark border-gold hover:bg-[#F5B730] hover:border-[#F5B730] active:bg-[#E6A820] shadow-[0_1px_3px_rgba(0,0,0,0.2)]",

        /*
         * brand — teal brand button.
         * Secondary CTA or actions on light surfaces.
         */
        brand:
          "bg-teal text-white border-teal hover:bg-teal-dark hover:border-teal-dark active:bg-[#085252]",

        /*
         * dark — near-black with subtle inner glow border.
         * Matches cofounder.co "Run a company" style.
         */
        dark: "bg-[#1a1a1a] text-white border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_3px_rgba(0,0,0,0.4)] hover:bg-[#252525] hover:border-white/15 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_4px_rgba(0,0,0,0.5)] active:bg-[#111] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] font-[460] tracking-[0.15px]",

        /*
         * ocean — deep navy background, for use on light surfaces.
         */
        ocean:
          "bg-ocean-500 text-white border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_3px_rgba(0,0,0,0.35)] hover:bg-ocean-500/90 hover:border-white/15 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_4px_rgba(0,0,0,0.45)] active:bg-ocean-700 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)] font-[460] tracking-[0.15px]",
        /*
         * outline — transparent with teal border.
         * Use on dark backgrounds.
         */
        outline:
          "bg-transparent text-teal border-teal hover:bg-teal hover:text-white active:bg-teal-dark",

        /*
         * outline-white — transparent with white border.
         * Use on hero image overlays.
         */
        "outline-white":
          "bg-transparent text-white border-white/50 hover:bg-white/10 hover:border-white active:bg-white/20",

        /*
         * ghost — no background, no border. Text only with hover bg.
         * Use for tertiary actions in menus, sidebars.
         */
        ghost:
          "bg-transparent text-foreground border-transparent hover:bg-muted hover:text-foreground active:bg-muted/80",

        /*
         * ghost-white — ghost on dark backgrounds.
         */
        "ghost-white":
          "bg-transparent text-white/80 border-transparent hover:bg-white/10 hover:text-white active:bg-white/20",

        /*
         * link — text only, underline on hover.
         */
        link: "bg-transparent border-transparent text-teal underline-offset-4 hover:underline p-0 h-auto",

        /*
         * destructive — red error/delete action.
         */
        destructive:
          "bg-error/10 text-error border-error/20 hover:bg-error/20 hover:border-error/30 focus-visible:ring-error/30 active:bg-error/30",
      },

      size: {
        xs: "h-6  px-2 text-xs lg:text-base gap-1 rounded-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7  px-2.5 text-xs lg:text-base gap-1 [&_svg:not([class*='size-'])]:size-3.5",
        default: "h-9  px-3.5 text-sm lg:text-base gap-1.5",
        lg: "h-9 px-4 text-base gap-1.5",
        xl: "h-12 px-6 text-base lg:text-lg gap-2",

        // Icon-only square sizes
        "icon-xs":
          "size-6  rounded-xs p-0 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7  rounded-xs p-0 [&_svg:not([class*='size-'])]:size-3.5",
        icon: "size-9  p-0",
        "icon-lg": "size-10 p-0",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
