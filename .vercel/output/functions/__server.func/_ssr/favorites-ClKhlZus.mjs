import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as products, l as useShop, t as Button } from "./products-ZXuhpxNh.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as Heart } from "../_libs/lucide-react.mjs";
import { t as ProductCard } from "./product-card-DUiLl6XP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favorites-ClKhlZus.js
var import_jsx_runtime = require_jsx_runtime();
function FavoritesPage() {
	const favorites = useShop((s) => s.favorites);
	const list = products.filter((p) => favorites.includes(p.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-center text-3xl font-semibold",
			children: "منتجاتك المفضلة"
		}), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "py-20 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "mx-auto size-12 text-rose" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-lg font-medium",
					children: "لسه مفيش حاجة في المفضلة"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "دوس على القلب على أي قطعة عجبتك."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "تسوقي الآن"
					})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5",
			children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
		})]
	});
}
//#endregion
export { FavoritesPage as component };
