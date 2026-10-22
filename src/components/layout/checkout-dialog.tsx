import * as Dialog from "@radix-ui/react-dialog";
import { Loader2, X } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";

import { GOVERNORATES } from "@/lib/config";
import { useShop } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { openWhatsApp } from "@/lib/whatsapp";
import { insertOrderToSupabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const empty = { name: "", phone: "", gov: "", area: "", address: "", notes: "" };

export function CheckoutDialog() {
  const open = useShop((s) => s.checkoutOpen);
  const setOpen = useShop((s) => s.setCheckoutOpen);
  const cart = useShop((s) => s.cart);
  const clearCart = useShop((s) => s.clearCart);
  const total = cart.reduce((s, l) => s + l.price * l.qty, 0);

  const [form, setForm] = useState(empty);
  const [submitting, setSubmitting] = useState(false);
  const shipping = GOVERNORATES.find((g) => g.name === form.gov)?.shipping;

  function field<K extends keyof typeof empty>(key: K) {
    return {
      value: form[key],
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  async function submit() {
    if (submitting) return;

    if (cart.length === 0) {
      toast.error("السلة فارغة. يرجى إضافة منتجات أولاً.");
      return;
    }

    const phone = form.phone.replace(/\s/g, "");
    if (!form.name.trim() || !phone || !form.gov.trim() || !form.address.trim()) {
      toast.error("كمّلي الاسم والموبايل والمحافظة والعنوان");
      return;
    }
    if (!/^01[0125][0-9]{8}$/.test(phone)) {
      toast.error("اكتبي رقم موبايل مصري صحيح (مثال: 01012345678)");
      return;
    }

    // التحقق من صلاحية الكميات والمخزون
    const invalidQty = cart.some((item) => item.qty <= 0 || item.qty > 50);
    if (invalidQty) {
      toast.error("توجد كمية غير صالحة لبعض المنتجات في السلة");
      return;
    }

    setSubmitting(true);

    try {
      // تجهيز بيانات المنتجات لقاعدة البيانات
      const items = cart.map((l) => ({
        name: l.name.trim().slice(0, 200),
        size: l.size ? l.size.trim().slice(0, 20) : null,
        qty: Math.min(Math.max(Math.trunc(l.qty), 1), 50),
        price: Number(l.price),
      }));

      const payload = {
        customer_name: form.name.trim().slice(0, 100),
        phone: phone,
        governorate: form.gov.trim().slice(0, 50),
        area: form.area.trim().slice(0, 100) || null,
        address: form.address.trim().slice(0, 500),
        notes: form.notes.trim().slice(0, 500) || null,
        items: items,
        items_total: total,
        shipping_estimate: shipping ?? null,
      };

      // إرسال الطلب لـ Supabase والتأكد من نجاح الإدخال
      const res = await insertOrderToSupabase(payload);

      if (!res.success) {
        toast.error(res.error || "فشل تسجيل الطلب في قاعدة البيانات. لم يتم إنشاء الطلب، يرجى المحاولة مرة أخرى.");
        setSubmitting(false);
        return;
      }

      // بعد التأكد التام من نجاح إدراج الطلب في Supabase
      const orderRef = res.orderId ? ` (رقم الطلب: #${res.orderId})` : "";

      let message = `مرحباً Elegant Touch، أود تأكيد طلب جديد${orderRef}.\n\n`;
      message += `الاسم: ${form.name}\nالهاتف: ${phone}\nالمحافظة: ${form.gov}\n`;
      message += `المنطقة: ${form.area || "غير محددة"}\nالعنوان: ${form.address}\n`;
      if (form.notes) message += `ملاحظات: ${form.notes}\n`;
      
      message += `\nالمنتجات:\n`;
      cart.forEach((item, i) => {
        const size = item.size ? ` — المقاس ${item.size}` : "";
        message += `${i + 1}. ${item.name}${size} × ${item.qty} = ${item.price * item.qty} ج.م\n`;
      });
      
      message += `\nإجمالي المنتجات: ${total} ج.م`;
      if (shipping) message += `\nتقدير الشحن: من ${shipping} ج.م`;
      message += `\n\nبرجاء تأكيد التوفر وتكلفة الشحن النهائية.`;

      // فتح واتساب بعد النجاح فقط
      openWhatsApp(message);

      clearCart();
      setForm(empty);
      setOpen(false);
      toast.success("تم تسجيل طلبك بنجاح! تم فتح واتساب لإتمام التأكيد");
    } catch (err: any) {
      console.error("خطأ أثناء معالجة الطلب:", err);
      toast.error("حدث خطأ غير متوقع. يرجى إعادة المحاولة.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !submitting && setOpen(v)}>
      <Dialog.Portal>
        <Dialog.Overlay className="et-overlay fixed inset-0 z-50 bg-fg/40" />
        <Dialog.Content className="et-modal fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[min(100%-1.5rem,440px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-surface p-6 text-fg shadow-soft">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <Dialog.Title className="text-lg font-semibold">بيانات التوصيل</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">
                الرسالة هتتبعت على واتساب جاهزة بعد حفظ الطلب. الإجمالي {formatPrice(total)}
                {shipping ? ` · شحن تقديري ${formatPrice(shipping)}` : ""}
              </Dialog.Description>
            </div>
            <Dialog.Close
              disabled={submitting}
              className="flex size-10 items-center justify-center rounded-full hover:bg-elevated disabled:opacity-50"
              aria-label="إغلاق"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="c-name">الاسم</Label>
              <Input id="c-name" autoComplete="name" disabled={submitting} {...field("name")} />
            </div>
            <div>
              <Label htmlFor="c-phone">رقم الموبايل</Label>
              <Input id="c-phone" inputMode="tel" placeholder="01xxxxxxxxx" disabled={submitting} {...field("phone")} />
            </div>
            <div>
              <Label htmlFor="c-gov">المحافظة</Label>
              <select
                id="c-gov"
                disabled={submitting}
                className="h-11 w-full rounded-md border border-line bg-surface px-3.5 text-sm outline-none focus:border-rose focus:ring-2 focus:ring-rose/15 disabled:opacity-50"
                value={form.gov}
                onChange={(e) => setForm((f) => ({ ...f, gov: e.target.value }))}
              >
                <option value="">اختاري المحافظة</option>
                {GOVERNORATES.map((g) => (
                  <option key={g.name} value={g.name}>
                    {g.name} — من {g.shipping} ج.م
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="c-area">المنطقة / الحي</Label>
              <Input id="c-area" disabled={submitting} {...field("area")} />
            </div>
            <div>
              <Label htmlFor="c-address">العنوان بالتفصيل</Label>
              <Textarea id="c-address" rows={2} disabled={submitting} {...field("address")} />
            </div>
            <div>
              <Label htmlFor="c-notes">ملاحظات</Label>
              <Textarea id="c-notes" rows={2} placeholder="مقاس إضافي، موعد مناسب..." disabled={submitting} {...field("notes")} />
            </div>

            <Button className="w-full" onClick={submit} disabled={cart.length === 0 || submitting}>
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  جاري تسجيل الطلب...
                </span>
              ) : (
                "إرسال الطلب على واتساب"
              )}
            </Button>

            <p className="text-xs leading-5 text-muted">
              يتم حفظ الطلب أولاً، ثم نؤكد معكِ على واتساب التوفر والشحن. تثبيت الطلب يتم بالاتفاق على عربون حسب سياسة المتجر.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
