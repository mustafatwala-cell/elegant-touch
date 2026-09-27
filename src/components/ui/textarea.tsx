import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-fg outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-subtle focus:border-rose focus:ring-2 focus:ring-rose/15",
        className,
      )}
      {...props}
    />
  );
}
