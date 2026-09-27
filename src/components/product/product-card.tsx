import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/products";
import { useShop } from "@/lib/store";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  const favorites = useShop((s) => s.favorites);
  const toggleFavorite = useShop((s) => s.toggleFavorite);
  const loved = favorites.includes(product.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-none transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-soft">
      <div className="relative aspect-portrait overflow-hidden bg-elevated">
        <Link to="/product/$id" params={{ id: String(product.id) }} className="block h-full">
          <img
            src={product.img}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        <button
          type="button"
          aria-label={loved ? "حذف من المفضلة" : "أضيفي للمفضلة"}
          onClick={() => toggleFavorite(product.id)}
          className={cn(
            "absolute top-2.5 left-2.5 z-10 flex size-10 items-center justify-center rounded-full bg-surface/95 text-fg shadow-soft",
            loved && "text-rose",
          )}
        >
          <Heart className={cn("size-4", loved && "fill-current")} />
        </button>
        {product.featured ? (
          <span className="absolute top-2.5 right-2.5 rounded-full bg-ink px-2.5 py-1 text-xs text-ink-fg">
            خط جديد
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <Link to="/product/$id" params={{ id: String(product.id) }}>
          <h3 className="text-sm font-medium leading-snug text-fg">{product.name}</h3>
        </Link>
        <p className="tabular-nums text-base font-semibold text-rose">{formatPrice(product.price)}</p>
        <Button asChild variant="ink" size="sm" className="mt-auto w-full">
          <Link to="/product/$id" params={{ id: String(product.id) }}>
            عرض التفاصيل
          </Link>
        </Button>
      </div>
    </article>
  );
}
