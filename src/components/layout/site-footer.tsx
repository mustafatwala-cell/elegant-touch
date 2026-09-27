import { useNavigate } from "@tanstack/react-router";
import { STORE } from "@/lib/config";
import { CATEGORIES } from "@/lib/products";
import { useShop } from "@/lib/store";

export function SiteFooter() {
  const navigate = useNavigate();
  const setActiveCat = useShop((s) => s.setActiveCat);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-ink text-ink-fg">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-xl text-rose-fg">Elegant Touch</p>
          <p className="mt-3 text-sm leading-7 text-muted">
            إكسسوارات ومجوهرات ستانلس ستيل مطلي ذهب، وحقائب مختارة. الطلب من الموقع، والتأكيد على واتساب.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-rose-fg">تسوقي</p>
          <ul className="space-y-2 text-sm text-muted">
            {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  className="hover:text-rose-fg"
                  onClick={() => {
                    setActiveCat(c.id);
                    void navigate({ to: "/" });
                    requestAnimationFrame(() => {
                      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                    });
                  }}
                >
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-rose-fg">خدمة العملاء</p>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <a href={`https://wa.me/${STORE.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-rose-fg">
                واتساب
              </a>
            </li>
            <li>
              <a href="/#shipping" className="hover:text-rose-fg">
                الشحن والتوصيل
              </a>
            </li>
            <li>
              <a href="/#shipping" className="hover:text-rose-fg">
                الاستبدال
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-rose-fg">تابعينا</p>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <a href={STORE.instagram} target="_blank" rel="noreferrer" className="hover:text-rose-fg">
                إنستجرام
              </a>
            </li>
            <li>
              <a href={STORE.facebook} target="_blank" rel="noreferrer" className="hover:text-rose-fg">
                فيسبوك
              </a>
            </li>
            <li>
              <a href={STORE.tiktok} target="_blank" rel="noreferrer" className="hover:text-rose-fg">
                تيك توك
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs text-muted">
        © {year} Elegant Touch. جميع الحقوق محفوظة.
      </p>
    </footer>
  );
}
