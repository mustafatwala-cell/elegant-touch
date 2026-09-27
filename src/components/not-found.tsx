import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-7xl text-rose">404</p>
      <h1 className="mt-4 text-2xl font-semibold">الصفحة غير موجودة</h1>
      <p className="mt-2 text-sm text-muted">الرابط ده مش موجود أو المنتج اتشال.</p>
      <Button asChild className="mt-8">
        <Link to="/">العودة للمتجر</Link>
      </Button>
    </main>
  );
}
