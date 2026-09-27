import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/lib/products";
import { useShop } from "@/lib/store";
import { cn } from "@/lib/utils";

function useDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("et-theme", next ? "dark" : "light");
    setDark(next);
  };
  return { dark, toggle };
}

function useHydrated() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}

export function SiteHeader() {
  const navigate = useNavigate();
  const { dark, toggle } = useDark();
  const hydrated = useHydrated();
  const cartCount = useShop((s) => s.cart.reduce((n, l) => n + l.qty, 0));
  const favCount = useShop((s) => s.favorites.length);
  const menuOpen = useShop((s) => s.menuOpen);
  const setMenuOpen = useShop((s) => s.setMenuOpen);
  const setCartOpen = useShop((s) => s.setCartOpen);
  const setActiveCat = useShop((s) => s.setActiveCat);

  function goCategory(id: (typeof CATEGORIES)[number]["id"]) {
    setActiveCat(id);
    setMenuOpen(false);
    void navigate({ to: "/" });
    requestAnimationFrame(() => {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-rose-dark px-4 py-2 text-center text-xs text-rose-fg sm:text-sm">
        توصيل لكل محافظات مصر · اطلبي من الموقع وأكّدي على واتساب
      </div>
      <nav className="border-b border-line bg-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <button
            type="button"
            className="flex size-11 items-center justify-center md:hidden"
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <span className="flex size-8 items-center justify-center rounded-full border border-rose text-[11px] font-semibold tracking-wide text-rose">
              ET
            </span>
            <span className="font-display text-xl font-semibold tracking-tight text-rose sm:text-2xl">
              Elegant Touch
            </span>
          </Link>

          <div className="hidden items-center gap-6 text-sm font-medium md:flex">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => goCategory(c.id)}
                className="text-fg hover:text-rose"
              >
                {c.label}
              </button>
            ))}
            <a href="/#about" className="text-fg hover:text-rose">
              من نحن
            </a>
          </div>

          <div className="flex items-center">
            <button type="button" className="flex size-11 items-center justify-center" aria-label="الوضع الليلي" onClick={toggle}>
              {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
            <Link
              to="/favorites"
              aria-label="المفضلة"
              className="relative flex size-11 items-center justify-center"
              onClick={() => setMenuOpen(false)}
            >
              <Heart className="size-5" />
              {hydrated && favCount > 0 ? (
                <span className="absolute top-1 left-1 flex size-4 items-center justify-center rounded-full bg-rose text-[10px] text-rose-fg">
                  {favCount}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              className="relative flex size-11 items-center justify-center"
              aria-label="السلة"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="size-5" />
              <span
                className={cn(
                  "absolute top-1 left-1 flex size-4 items-center justify-center rounded-full bg-rose text-[10px] text-rose-fg",
                  (!hydrated || cartCount === 0) && "hidden",
                )}
              >
                {cartCount}
              </span>
            </button>
          </div>
        </div>
        {menuOpen ? (
          <div className="flex flex-col gap-1 border-t border-line px-4 py-3 md:hidden">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => goCategory(c.id)}
                className="h-11 rounded-md px-2 text-right text-sm hover:bg-elevated"
              >
                {c.label}
              </button>
            ))}
            <a href="/#about" className="flex h-11 items-center px-2 text-sm" onClick={() => setMenuOpen(false)}>
              من نحن
            </a>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
