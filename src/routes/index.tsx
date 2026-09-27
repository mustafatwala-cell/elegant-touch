import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES, products } from "@/lib/products";
import { useShop } from "@/lib/store";
import { helpWhatsAppUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const activeCat = useShop((s) => s.activeCat);
  const setActiveCat = useShop((s) => s.setActiveCat);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"default" | "low" | "high">("default");

  const featured = products.filter((p) => p.featured);

  const list = useMemo(() => {
    let next = activeCat === "all" ? [...products] : products.filter((p) => p.cat === activeCat);
    const q = query.trim();
    if (q) next = next.filter((p) => `${p.name} ${p.desc}`.includes(q));
    if (sort === "low") next.sort((a, b) => a.price - b.price);
    if (sort === "high") next.sort((a, b) => b.price - a.price);
    return next;
  }, [activeCat, query, sort]);

  return (
    <main>
      <section className="relative">
        <img src="/products/hero.jpg" alt="" className="h-[70vh] min-h-[420px] w-full object-cover" />
        <div
          className="absolute inset-0 flex items-center"
          style={{
            background: "linear-gradient(to left, rgb(28 22 20 / 0.78), rgb(28 22 20 / 0.18))",
          }}
        >
          <div className="mx-auto w-full max-w-6xl px-5">
            <div className="max-w-lg text-ink-fg">
              <p className="text-sm tracking-wide text-rose-fg/80">ستانلس ستيل مطلي ذهب</p>
              <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                لمسة أنيقة.
                <br />
                كل يوم.
              </h1>
              <p className="mt-4 text-base leading-8 text-ink-fg/85">
                خط جديد من الخواتم والإكسسوارات المختارة بعناية. الصور على الخواتم هي المنتج الفعلي، والطلب بيتأكد معاكي على واتساب.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#rings">تسوقي الخواتم</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-ink-fg/30 bg-transparent text-ink-fg hover:bg-ink-fg/10 hover:text-ink-fg"
                >
                  <a href="#products">كل المنتجات</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 py-7 text-sm text-ink-fg sm:grid-cols-3">
          <TrustItem icon={<Truck className="size-4" />} text="شحن لكل محافظات مصر" />
          <TrustItem icon={<ShieldCheck className="size-4" />} text="ستانلس ستيل لا يصدأ" />
          <TrustItem icon={<MessageCircle className="size-4" />} text="تأكيد الطلب على واتساب" />
        </div>
      </section>

      <section id="rings" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-rose">الخط الجديد</p>
            <h2 className="mt-1 text-3xl font-semibold">خواتم على الإيد</h2>
            <p className="mt-2 max-w-xl text-sm leading-7 text-muted">
              خمس قطع حقيقية من تصويرنا. كل خاتم باسمه وسعره ومقاسه — مش مجرد كلمة ring.
            </p>
          </div>
          <Button asChild variant="outline">
            <a href="#products" className="gap-2">
              باقي المتجر
              <ArrowLeft className="size-4" />
            </a>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-5 pb-6 md:grid-cols-4 md:gap-4">
        {(
          [
            ["jewellery", "مجوهرات", "/products/necklace.jpg"],
            ["bags", "حقائب", "/products/bag.jpg"],
            ["accessories", "إكسسوارات", "/products/sunglasses.jpg"],
            ["gifts", "هدايا", "/products/perfume.jpg"],
          ] as const
        ).map(([id, label, img]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setActiveCat(id);
              document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative aspect-portrait overflow-hidden rounded-lg"
          >
            <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-3 py-4 text-right text-sm font-semibold text-ink-fg">
              {label}
            </span>
          </button>
        ))}
      </section>

      <section id="products" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold">تسوقي حسب القسم</h2>
          <p className="mt-2 text-sm text-muted">ابحثي بالاسم أو فلترة السعر</p>
        </div>
        <div className="mx-auto mb-5 max-w-xl">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحثي عن خاتم، شنطة، هدية..."
            aria-label="بحث"
          />
        </div>
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCat(c.id)}
              className={`h-10 rounded-full px-4 text-sm ${
                activeCat === c.id ? "bg-rose text-rose-fg" : "border border-line bg-surface text-fg hover:border-rose"
              }`}
            >
              {c.label}
            </button>
          ))}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="h-10 rounded-full border border-line bg-surface px-3 text-sm"
            aria-label="ترتيب"
          >
            <option value="default">الأحدث</option>
            <option value="low">السعر: الأقل</option>
            <option value="high">السعر: الأعلى</option>
          </select>
        </div>
        <p className="mb-4 text-center text-xs text-muted">
          عرض {list.length} من {products.length} منتج
        </p>
        {list.length === 0 ? (
          <p className="py-16 text-center text-muted">مفيش نتائج. جرّبي كلمة تانية أو قسم مختلف.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <section id="about" className="border-t border-line bg-elevated">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">من نحن</h2>
            <p className="mt-4 text-sm leading-8 text-muted">
              Elegant Touch متجر مصري للإكسسوارات والمجوهرات والحقائب. بنركّز على قطع تقدري تلبسيها كل يوم: ستانلس ستيل مطلي ذهب، وتصوير حقيقي للخواتم مش صور كتالوج جاهزة.
            </p>
            <p className="mt-3 text-sm leading-8 text-muted">
              بتختاري من الموقع، بتبعثي الطلب على واتساب، وبعدين نأكد التوفر وسعر الشحن لمحافظتك قبل أي دفع.
            </p>
            <Button asChild className="mt-6">
              <a href={helpWhatsAppUrl()} target="_blank" rel="noreferrer">
                اسألي على واتساب
              </a>
            </Button>
          </div>
          <div id="shipping" className="rounded-xl border border-line bg-surface p-6">
            <h3 className="text-lg font-semibold">الشحن والاستبدال</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
              <li>الشحن لكل المحافظات. التقدير يظهر عند اختيار المحافظة في الطلب، والتكلفة النهائية قبل التثبيت.</li>
              <li>مدة التوصيل عادة من 2 إلى 5 أيام عمل حسب المنطقة.</li>
              <li>لو في مشكلة في المنتج، ابعتي صور على واتساب قبل أي استبدال.</li>
              <li>تثبيت الطلب يتم بالاتفاق على عربون بعد تأكيد الشحن — مش قبل ما نكلمك.</li>
            </ul>
            <Link to="/product/$id" params={{ id: "1" }} className="mt-5 inline-block text-sm text-rose hover:underline">
              شوفي خاتم طبقات النجمة
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function TrustItem({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {icon}
      <span>{text}</span>
    </div>
  );
}
