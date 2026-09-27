import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as cn, l as useShop, o as formatPrice, t as Button } from "./products-ZXuhpxNh.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as Heart } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product-card-DUiLl6XP.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product }) {
	const favorites = useShop((s) => s.favorites);
	const toggleFavorite = useShop((s) => s.toggleFavorite);
	const loved = favorites.includes(product.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-none transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-portrait overflow-hidden bg-elevated",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/product/$id",
					params: { id: String(product.id) },
					className: "block h-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.img,
						alt: product.name,
						className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
						loading: "lazy"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": loved ? "حذف من المفضلة" : "أضيفي للمفضلة",
					onClick: () => toggleFavorite(product.id),
					className: cn("absolute top-2.5 left-2.5 z-10 flex size-10 items-center justify-center rounded-full bg-surface/95 text-fg shadow-soft", loved && "text-rose"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-4", loved && "fill-current") })
				}),
				product.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute top-2.5 right-2.5 rounded-full bg-ink px-2.5 py-1 text-xs text-ink-fg",
					children: "خط جديد"
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-1.5 p-3.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/product/$id",
					params: { id: String(product.id) },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium leading-snug text-fg",
						children: product.name
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tabular-nums text-base font-semibold text-rose",
					children: formatPrice(product.price)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ink",
					size: "sm",
					className: "mt-auto w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/product/$id",
						params: { id: String(product.id) },
						children: "عرض التفاصيل"
					})
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
