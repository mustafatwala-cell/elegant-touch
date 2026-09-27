import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Minus, Plus, Share2, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/product/product-card";
import { NotFound } from "@/components/not-found";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categoryLabel, getProduct, products, SEED_REVIEWS } from "@/lib/products";
import { useShop } from "@/lib/store";
import { cn, formatPrice } from "@/lib/utils";
import { openWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
  head: ({ params }) => {
    const product = getProduct(params.id);
    return {
      meta: [
        {
          title: product ? `${product.name} | Elegant Touch` : "المنتج غير موجود | Elegant Touch",
        },
      ],
    };
  },
});

function ProductPage() {
  const { id } = Route.useParams();
  const product = getProduct(id);
  if (!product) return <NotFound />;
  return <ProductView key={product.id} product={product} />;
}

function ProductView({ product }: { product: NonNullable<ReturnType<typeof getProduct>> }) {

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(product.sizes?.[0] ?? null);
  const [activeImg, setActiveImg] = useState(product.img);
  const addToCart = useShop((s) => s.addToCart);
  const setCartOpen = useShop((s) => s.setCartOpen);
  const favorites = useShop((s) => s.favorites);
  const toggleFavorite = useShop((s) => s.toggleFavorite);
  const userReviews = useShop((s) => s.reviews[String(product.id)]);
  const addReview = useShop((s) => s.addReview);
  const loved = favorites.includes(product.id);

  const reviews = useMemo(() => {
    const seeds = (SEED_REVIEWS[product.id] ?? []).map((r) => ({ ...r, at: 0 }));
    const extra = userReviews ?? [];
    return [...extra, ...seeds];
  }, [product.id, userReviews]);

  const avg =
    reviews.length === 0 ? 0 : reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  const related = products.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 4);

  function add(openCart = false) {
    if (product.sizes?.length && !size) {
      toast.error("اختاري المقاس");
      return;
    }
    addToCart(product, qty, size);
    toast.success("اتضافت للسلة");
    if (openCart) setCartOpen(true);
  }

  async function share() {
    const data = { title: product.name, text: `${product.name} — ${formatPrice(product.price)}`, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("تم نسخ الرابط");
      }
    } catch {
      /* user cancelled */
    }
  }

  function buyNow() {
    if (product.sizes?.length && !size) {
      toast.error("اختاري المقاس");
      return;
    }
    const total = product.price * qty;
    openWhatsApp(
      `مرحباً Elegant Touch، أود طلب:\n${product.name}\nالسعر: ${product.price} ج.م\nالمقاس: ${size ?? "غير محدد"}\nالكمية: ${qty}\nالإجمالي: ${total} ج.م\nرابط المنتج: ${window.location.href}\nبرجاء تأكيد التوفر والشحن.`,
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-8">
      <nav className="mb-6 text-sm text-muted">
        <Link to="/" className="hover:text-rose">
          المتجر
        </Link>
        <span className="mx-2">/</span>
        <span>{categoryLabel(product.cat)}</span>
        <span className="mx-2">/</span>
        <span className="text-fg">{product.name}</span>
      </nav>

      <section className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <div className="overflow-hidden rounded-xl bg-elevated">
            <img src={activeImg} alt={product.name} className="aspect-square w-full object-cover" />
          </div>
          {product.images.length > 1 ? (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImg(src)}
                  aria-label={`صورة ${i + 1}`}
                  className={cn(
                    "size-20 shrink-0 overflow-hidden rounded-md border-2",
                    activeImg === src ? "border-rose" : "border-line",
                  )}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="rounded-xl bg-surface p-6 md:p-8">
          <p className="text-sm text-muted">{categoryLabel(product.cat)}</p>
          <div className="mt-1 flex items-start justify-between gap-3">
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <button
              type="button"
              aria-label="المفضلة"
              onClick={() => toggleFavorite(product.id)}
              className={cn("flex size-11 shrink-0 items-center justify-center rounded-full border border-line", loved && "text-rose")}
            >
              <Heart className={cn("size-5", loved && "fill-current")} />
            </button>
          </div>
          <p className="mt-3 text-2xl font-semibold tabular-nums text-rose">{formatPrice(product.price)}</p>
          {reviews.length > 0 ? (
            <p className="mt-2 flex items-center gap-1 text-sm text-muted">
              <Star className="size-4 fill-current text-rose" />
              {avg.toFixed(1)} · {reviews.length} تقييم
            </p>
          ) : null}
          <p className="mt-5 leading-8 text-muted">{product.desc}</p>

          <dl className="mt-6 divide-y divide-line rounded-lg bg-elevated px-4">
            <div className="flex justify-between py-3 text-sm">
              <dt className="text-muted">الخامة</dt>
              <dd>{product.material}</dd>
            </div>
            <div className="flex justify-between py-3 text-sm">
              <dt className="text-muted">الحالة</dt>
              <dd className="text-rose">{product.stock}</dd>
            </div>
          </dl>
          <ul className="mt-4 list-disc space-y-1 pr-5 text-sm leading-7 text-muted">
            {product.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          {product.sizes?.length ? (
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium">المقاس</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((z) => (
                  <button
                    key={z}
                    type="button"
                    onClick={() => setSize(z)}
                    className={cn(
                      "h-11 min-w-11 rounded-full border px-4 text-sm",
                      size === z ? "border-rose bg-rose text-rose-fg" : "border-line bg-surface",
                    )}
                  >
                    {z}
                  </button>
                ))}
              </div>
              {/^\d+$/.test(product.sizes[0] ?? "") ? (
                <p className="mt-2 text-xs text-muted">المقاس بنظام أمريكي. مش متأكدة؟ ابعتي قياس محيط الإصبع على واتساب.</p>
              ) : null}
            </div>
          ) : null}

          <div className="mt-6">
            <p className="mb-2 text-sm font-medium">الكمية</p>
            <div className="flex items-center gap-3">
              <button type="button" className="flex size-10 items-center justify-center rounded-full bg-elevated" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="تقليل">
                <Minus className="size-4" />
              </button>
              <span className="w-6 text-center tabular-nums">{qty}</span>
              <button type="button" className="flex size-10 items-center justify-center rounded-full bg-elevated" onClick={() => setQty((q) => q + 1)} aria-label="زيادة">
                <Plus className="size-4" />
              </button>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <Button variant="ink" onClick={() => add(true)}>
              أضيفي للسلة
            </Button>
            <Button onClick={buyNow}>اطلبي الآن</Button>
          </div>
          <Button variant="outline" className="mt-3 w-full" onClick={share}>
            <Share2 className="size-4" />
            مشاركة المنتج
          </Button>

          <div className="mt-6 rounded-lg bg-elevated p-4 text-sm leading-7 text-muted">
            الشحن لكل محافظات مصر. التقدير يظهر عند كتابة المحافظة في الطلب، والتأكيد النهائي على واتساب قبل أي دفع.
          </div>
        </div>
      </section>

      <ReviewsBlock
        reviews={reviews}
        onSubmit={(name, rating, comment) => addReview(product.id, { name, rating, comment })}
      />

      {related.length ? (
        <section className="mt-14">
          <h2 className="mb-6 text-xl font-semibold">قطع مشابهة</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function ReviewsBlock({
  reviews,
  onSubmit,
}: {
  reviews: { name: string; rating: number; comment: string }[];
  onSubmit: (name: string, rating: number, comment: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  return (
    <section className="mt-12 rounded-xl bg-surface p-6 md:p-8">
      <h2 className="text-xl font-semibold">تقييمات العميلات</h2>
      <div className="mt-5 space-y-3">
        {reviews.length === 0 ? <p className="text-sm text-muted">كن أول من يقيّم القطعة.</p> : null}
        {reviews.map((r, i) => (
          <article key={`${r.name}-${i}`} className="rounded-lg bg-elevated p-4">
            <div className="flex items-center justify-between gap-2">
              <strong className="text-sm">{r.name}</strong>
              <span className="text-sm text-rose">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
            </div>
            {r.comment ? <p className="mt-2 text-sm leading-7 text-muted">{r.comment}</p> : null}
          </article>
        ))}
      </div>
      <Button variant="outline" className="mt-5 w-full" onClick={() => setOpen((v) => !v)}>
        أضيفي تقييمك
      </Button>
      {open ? (
        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim()) {
              toast.error("اكتبي اسمك");
              return;
            }
            onSubmit(name.trim(), rating, comment.trim());
            setName("");
            setComment("");
            setRating(5);
            setOpen(false);
            toast.success("شكرًا لتقييمك");
          }}
        >
          <div>
            <Label htmlFor="rev-name">الاسم</Label>
            <Input id="rev-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>التقييم</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} className="size-10 text-xl text-rose" aria-label={`${n} نجوم`}>
                  {n <= rating ? "★" : "☆"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="rev-c">تعليق</Label>
            <Textarea id="rev-c" value={comment} onChange={(e) => setComment(e.target.value)} />
          </div>
          <Button type="submit" className="w-full">
            إرسال
          </Button>
        </form>
      ) : null}
    </section>
  );
}
