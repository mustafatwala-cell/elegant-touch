import { STORE } from "./config";

export function openWhatsApp(text: string) {
  const url = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function helpWhatsAppUrl() {
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent("مرحباً Elegant Touch، محتاجة مساعدة في الطلب.")}`;
}
