import { MessageCircle } from "lucide-react";
import { helpWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFab() {
  return (
    <a
      href={helpWhatsAppUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="تواصلي على واتساب"
      className="fixed bottom-5 left-5 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-rose-fg shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
    >
      <MessageCircle className="size-6 fill-current" />
    </a>
  );
}
