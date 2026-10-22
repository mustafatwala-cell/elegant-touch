import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { products as staticProducts, type Product } from "@/lib/products";
import { useShop } from "@/lib/store";
import { fetchProductsFromSupabase } from "@/lib/supabase";

export const Route = createFileRoute("/favorites")({
  component: FavoritesPage,
});

function FavoritesPage() {
  const favorites = useShop((s) => s.favorites);
  const [allProducts, setAllProducts] = useState<Product[]>(staticProducts);

  useEffect(() => {
    let active = true;
    async function load() {
      const sbProducts = await fetchProductsFromSupabase();
      if (active && sbProducts && sbProducts.length > 0) {
        setAllProducts(sbProducts);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const list = allProducts.filter((p) => favorites.includes(p.id));

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="text-center text-3xl font-semibold">منتجاتك المفضلة</h1>
      {list.length === 0 ? (
        <div className="py-20 text-center">
          <Heart className="mx-auto size-12 text-rose" />
          <p className="mt-4 text-lg font-medium">لسه مفيش حاجة في المفضلة</p>
          <p className="mt-2 text-sm text-muted">دوس على القلب على أي قطعة عجبتك.</p>
          <Button asChild className="mt-6">
            <Link to="/">تسوقي الآن</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
