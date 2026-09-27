import * as Dialog from "@radix-ui/react-dialog";
import { Minus, Plus, X } from "lucide-react";
import { useShop } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const cart = useShop((s) => s.cart);
  const open = useShop((s) => s.cartOpen);
  const setOpen = useShop((s) => s.setCartOpen);
  const changeQty = useShop((s) => s.changeQty);
  const removeFromCart = useShop((s) => s.removeFromCart);
  const setCheckoutOpen = useShop((s) => s.setCheckoutOpen);
  const total = cart.reduce((s, l) => s + l.price * l.qty, 0);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="et-overlay fixed inset-0 z-50 bg-fg/40" />
        <Dialog.Content
          aria-describedby={undefined}
          className="et-drawer fixed inset-y-0 left-0 z-50 flex h-full w-full max-w-md flex-col bg-surface text-fg shadow-soft"
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Dialog.Title className="text-lg font-semibold">السلة</Dialog.Title>
            <Dialog.Close className="flex size-11 items-center justify-center rounded-full hover:bg-elevated" aria-label="إغلاق">
              <X className="size-5" />
            </Dialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {cart.length === 0 ? (
              <p className="mt-12 text-center text-sm text-muted">السلة فاضية. اختاري قطعة تعجبك.</p>
            ) : (
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li key={item.key} className="flex gap-3 border-b border-line pb-4">
                    <img src={item.img} alt="" className="size-16 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium">{item.name}</p>
                        <button type="button" className="text-xs text-muted hover:text-rose" onClick={() => removeFromCart(item.key)}>
                          حذف
                        </button>
                      </div>
                      {item.size ? <p className="text-xs text-muted">المقاس: {item.size}</p> : null}
                      <p className="mt-1 text-sm font-semibold text-rose">{formatPrice(item.price)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          className="flex size-8 items-center justify-center rounded-full bg-elevated"
                          onClick={() => changeQty(item.key, -1)}
                          aria-label="تقليل"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-5 text-center text-sm tabular-nums">{item.qty}</span>
                        <button
                          type="button"
                          className="flex size-8 items-center justify-center rounded-full bg-elevated"
                          onClick={() => changeQty(item.key, 1)}
                          aria-label="زيادة"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="border-t border-line p-5">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-muted">الإجمالي</span>
              <span className="text-lg font-semibold tabular-nums">{formatPrice(total)}</span>
            </div>
            <Button
              className="w-full"
              disabled={cart.length === 0}
              onClick={() => {
                setOpen(false);
                setCheckoutOpen(true);
              }}
            >
              إتمام الطلب عبر واتساب
            </Button>
            <p className="mt-3 text-center text-xs leading-5 text-muted">
              الشحن يتأكد حسب المحافظة قبل تثبيت الطلب.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
