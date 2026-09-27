import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { GOVERNORATES } from "@/lib/config";
import { useShop } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { openWhatsApp } from "@/lib/whatsapp";
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
  const shipping = GOVERNORATES.find((g) => g.name === form.gov)?.shipping;

  function field<K extends keyof typeof empty>(key: K) {
    return {
      value: form[key],
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  function submit() {
    const phone = form.phone.replace(/\s/g, "");
    if (!form.name || !phone || !form.gov || !form.address) {
      toast.error("كمّلي الاسم والموبايل والمحافظة والعنوان");
      return;
    }
    if (!/^01[0125][0-9]{8}$/.test(phone)) {
      toast.error("اكتبي رقم موبايل مصري صحيح");
      return;
    }
    let message = `مرحباً Elegant Touch، أود تأكيد طلب جديد.\n\n`;
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
    openWhatsApp(message);
    clearCart();
    setForm(empty);
    setOpen(false);
    toast.success("اتفتح واتساب — كمّلي إرسال الرسالة");
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="et-overlay fixed inset-0 z-50 bg-fg/40" />
        <Dialog.Content className="et-modal fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[min(100%-1.5rem,440px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-surface p-6 text-fg shadow-soft">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <Dialog.Title className="text-lg font-semibold">بيانات التوصيل</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">
                الرسالة هتتبعت على واتساب جاهزة. الإجمالي {formatPrice(total)}
                {shipping ? ` · شحن تقديري ${formatPrice(shipping)}` : ""}
              </Dialog.Description>
            </div>
            <Dialog.Close className="flex size-10 items-center justify-center rounded-full hover:bg-elevated" aria-label="إغلاق">
              <X className="size-4" />
            </Dialog.Close>
          </div>
          <div className="space-y-3">
            <div>
              <Label htmlFor="c-name">الاسم</Label>
              <Input id="c-name" autoComplete="name" {...field("name")} />
            </div>
            <div>
              <Label htmlFor="c-phone">رقم الموبايل</Label>
              <Input id="c-phone" inputMode="tel" placeholder="01xxxxxxxxx" {...field("phone")} />
            </div>
            <div>
              <Label htmlFor="c-gov">المحافظة</Label>
              <select
                id="c-gov"
                className="h-11 w-full rounded-md border border-line bg-surface px-3.5 text-sm outline-none focus:border-rose focus:ring-2 focus:ring-rose/15"
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
              <Input id="c-area" {...field("area")} />
            </div>
            <div>
              <Label htmlFor="c-address">العنوان بالتفصيل</Label>
              <Textarea id="c-address" rows={2} {...field("address")} />
            </div>
            <div>
              <Label htmlFor="c-notes">ملاحظات</Label>
              <Textarea id="c-notes" rows={2} placeholder="مقاس إضافي، موعد مناسب..." {...field("notes")} />
            </div>
            <Button className="w-full" onClick={submit} disabled={cart.length === 0}>
              إرسال الطلب على واتساب
            </Button>
            <p className="text-xs leading-5 text-muted">
              بعد الرسالة هنتأكد معاكي من التوفر والشحن. تثبيت الطلب بيتم بالاتفاق على عربون حسب سياسة المتجر.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
