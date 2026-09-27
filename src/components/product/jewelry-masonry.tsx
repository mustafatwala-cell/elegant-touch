import { Link } from "@tanstack/react-router";
import { ArrowUpLeft } from "lucide-react";
import type { Product } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";

const TILE_SHAPES = [
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[2/3]",
  "aspect-[4/5]",
  "aspect-[3/5]",
  "aspect-[5/4]",
] as const;

export function JewelryMasonry({ items }: { items: Product[] }) {
  return (
    <ul className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4 lg:gap-5" role="list">
      {items.map((product, index) => (
        <li key={product.id} className="mb-3 break-inside-avoid sm:mb-4 lg:mb-5">
          <MasonryTile product={product} shape={TILE_SHAPES[index % TILE_SHAPES.length]} priority={index < 4} />
        </li>
      ))}
    </ul>
  );
}

function MasonryTile({ product, shape, priority }: { product: Product; shape: string; priority: boolean }) {
  return (
    <Link
      to="/product/$id"
      params={{ id: String(product.id) }}
      className="group relative block overflow-hidden rounded-xl bg-elevated outline-none ring-rose ring-offset-2 ring-offset-bg focus-visible:ring-2"
    >
      <div className={cn("w-full overflow-hidden", shape)}>
        <img
          src={product.img}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />

      {product.stock === "كمية محدودة" ? (
        <span className="absolute top-2.5 right-2.5 rounded-full bg-surface/95 px-2.5 py-1 text-[11px] font-medium text-rose">
          كمية محدودة
        </span>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 text-ink-fg sm:p-4">
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug sm:text-base">{product.name}</h3>
          <p className="mt-0.5 text-xs text-ink-fg/80 sm:text-sm">{formatPrice(product.price)}</p>
        </div>
        <span className="flex size-8 shrink-0 translate-y-1 items-center justify-center rounded-full bg-surface/95 text-fg opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:size-9">
          <ArrowUpLeft className="size-4" />
          <span className="sr-only">عرض المنتج</span>
        </span>
      </div>
    </Link>
  );
}
