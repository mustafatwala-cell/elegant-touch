import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[background-color,color,transform,opacity] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose/40",
  {
    variants: {
      variant: {
        default: "bg-rose text-rose-fg hover:bg-rose-dark",
        ink: "bg-ink text-ink-fg hover:bg-rose",
        outline: "border border-line bg-surface text-fg hover:border-rose hover:text-rose",
        ghost: "text-fg hover:bg-elevated",
        whatsapp: "bg-whatsapp text-rose-fg hover:opacity-90",
      },
      size: {
        default: "h-11 rounded-full px-5 text-sm",
        sm: "h-9 rounded-full px-4 text-sm",
        lg: "h-12 rounded-full px-7 text-sm",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
