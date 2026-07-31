import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-night disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "glass-btn bg-accent/30 text-text hover:scale-[1.02]",
        secondary: "glass-btn bg-white/[0.05] text-text hover:scale-[1.02]",
        ghost: "text-text-muted hover:text-text hover:bg-white/[0.04]",
      },
      size: {
        md: "h-11 px-5 text-sm",
        lg: "h-14 px-7 text-[0.95rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
