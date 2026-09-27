import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { CartDrawer } from "./cart-drawer";
import { CheckoutDialog } from "./checkout-dialog";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { WhatsAppFab } from "./whatsapp-fab";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
      <CartDrawer />
      <CheckoutDialog />
      <WhatsAppFab />
      <Toaster position="top-center" dir="rtl" richColors={false} />
    </div>
  );
}
