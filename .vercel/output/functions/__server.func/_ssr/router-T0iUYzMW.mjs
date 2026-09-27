import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as cn, l as useShop, n as CATEGORIES, o as formatPrice, s as getProduct, t as Button } from "./products-ZXuhpxNh.mjs";
import { _ as createFileRoute, b as useNavigate, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Minus, f as MessageCircle, i as Sun, l as Plus, m as Heart, o as ShoppingBag, p as Menu, r as TriangleAlert, t as X, u as Moon } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-T0iUYzMW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-rose",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "حصل خطأ"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			})
		]
	});
}
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-5 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-7xl text-rose",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-2xl font-semibold",
				children: "الصفحة غير موجودة"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "الرابط ده مش موجود أو المنتج اتشال."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "العودة للمتجر"
				})
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function CartDrawer() {
	const cart = useShop((s) => s.cart);
	const open = useShop((s) => s.cartOpen);
	const setOpen = useShop((s) => s.setCartOpen);
	const changeQty = useShop((s) => s.changeQty);
	const removeFromCart = useShop((s) => s.removeFromCart);
	const setCheckoutOpen = useShop((s) => s.setCheckoutOpen);
	const total = cart.reduce((s, l) => s + l.price * l.qty, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "et-overlay fixed inset-0 z-50 bg-fg/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"aria-describedby": void 0,
			className: "et-drawer fixed inset-y-0 left-0 z-50 flex h-full w-full max-w-md flex-col bg-surface text-fg shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-line px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-lg font-semibold",
						children: "السلة"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
						className: "flex size-11 items-center justify-center rounded-full hover:bg-elevated",
						"aria-label": "إغلاق",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto px-5 py-4",
					children: cart.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-12 text-center text-sm text-muted",
						children: "السلة فاضية. اختاري قطعة تعجبك."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-4",
						children: cart.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3 border-b border-line pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.img,
								alt: "",
								className: "size-16 rounded-md object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium",
											children: item.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "text-xs text-muted hover:text-rose",
											onClick: () => removeFromCart(item.key),
											children: "حذف"
										})]
									}),
									item.size ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: ["المقاس: ", item.size]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm font-semibold text-rose",
										children: formatPrice(item.price)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "flex size-8 items-center justify-center rounded-full bg-elevated",
												onClick: () => changeQty(item.key, -1),
												"aria-label": "تقليل",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-5 text-center text-sm tabular-nums",
												children: item.qty
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "flex size-8 items-center justify-center rounded-full bg-elevated",
												onClick: () => changeQty(item.key, 1),
												"aria-label": "زيادة",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" })
											})
										]
									})
								]
							})]
						}, item.key))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-line p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "الإجمالي"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg font-semibold tabular-nums",
								children: formatPrice(total)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							disabled: cart.length === 0,
							onClick: () => {
								setOpen(false);
								setCheckoutOpen(true);
							},
							children: "إتمام الطلب عبر واتساب"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-center text-xs leading-5 text-muted",
							children: "الشحن يتأكد حسب المحافظة قبل تثبيت الطلب."
						})
					]
				})
			]
		})] })
	});
}
var STORE = {
	name: "Elegant Touch",
	tagline: "إكسسوارات ومجوهرات مختارة بعناية",
	whatsapp: "201557637446",
	instagram: "https://www.instagram.com/elegant.touch33/",
	facebook: "https://www.facebook.com/share/19UngUaqoQ/",
	tiktok: "https://www.tiktok.com/@elegant.touch22"
};
var GOVERNORATES = [
	{
		name: "القاهرة",
		shipping: 40
	},
	{
		name: "الجيزة",
		shipping: 40
	},
	{
		name: "القليوبية",
		shipping: 45
	},
	{
		name: "الإسكندرية",
		shipping: 55
	},
	{
		name: "البحيرة",
		shipping: 60
	},
	{
		name: "كفر الشيخ",
		shipping: 60
	},
	{
		name: "الغربية",
		shipping: 55
	},
	{
		name: "المنوفية",
		shipping: 50
	},
	{
		name: "الدقهلية",
		shipping: 55
	},
	{
		name: "دمياط",
		shipping: 60
	},
	{
		name: "الشرقية",
		shipping: 55
	},
	{
		name: "بورسعيد",
		shipping: 65
	},
	{
		name: "الإسماعيلية",
		shipping: 60
	},
	{
		name: "السويس",
		shipping: 60
	},
	{
		name: "شمال سيناء",
		shipping: 80
	},
	{
		name: "جنوب سيناء",
		shipping: 90
	},
	{
		name: "الفيوم",
		shipping: 55
	},
	{
		name: "بني سويف",
		shipping: 60
	},
	{
		name: "المنيا",
		shipping: 70
	},
	{
		name: "أسيوط",
		shipping: 75
	},
	{
		name: "سوهاج",
		shipping: 80
	},
	{
		name: "قنا",
		shipping: 85
	},
	{
		name: "الأقصر",
		shipping: 90
	},
	{
		name: "أسوان",
		shipping: 95
	},
	{
		name: "البحر الأحمر",
		shipping: 90
	},
	{
		name: "الوادي الجديد",
		shipping: 95
	},
	{
		name: "مطروح",
		shipping: 80
	}
];
function openWhatsApp(text) {
	const url = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`;
	window.open(url, "_blank", "noopener,noreferrer");
}
function helpWhatsAppUrl() {
	return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent("مرحباً Elegant Touch، محتاجة مساعدة في الطلب.")}`;
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-md border border-line bg-surface px-3.5 text-sm text-fg outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-subtle focus:border-rose focus:ring-2 focus:ring-rose/15", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("mb-1.5 block text-sm font-medium text-fg", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-24 w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-fg outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-subtle focus:border-rose focus:ring-2 focus:ring-rose/15", className),
		...props
	});
}
var empty = {
	name: "",
	phone: "",
	gov: "",
	area: "",
	address: "",
	notes: ""
};
function CheckoutDialog() {
	const open = useShop((s) => s.checkoutOpen);
	const setOpen = useShop((s) => s.setCheckoutOpen);
	const cart = useShop((s) => s.cart);
	const clearCart = useShop((s) => s.clearCart);
	const total = cart.reduce((s, l) => s + l.price * l.qty, 0);
	const [form, setForm] = (0, import_react.useState)(empty);
	const shipping = GOVERNORATES.find((g) => g.name === form.gov)?.shipping;
	function field(key) {
		return {
			value: form[key],
			onChange: (e) => setForm((f) => ({
				...f,
				[key]: e.target.value
			}))
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "et-overlay fixed inset-0 z-50 bg-fg/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "et-modal fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[min(100%-1.5rem,440px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-surface p-6 text-fg shadow-soft",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-lg font-semibold",
					children: "بيانات التوصيل"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
					className: "mt-1 text-sm text-muted",
					children: [
						"الرسالة هتتبعت على واتساب جاهزة. الإجمالي ",
						formatPrice(total),
						shipping ? ` · شحن تقديري ${formatPrice(shipping)}` : ""
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					className: "flex size-10 items-center justify-center rounded-full hover:bg-elevated",
					"aria-label": "إغلاق",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "c-name",
						children: "الاسم"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "c-name",
						autoComplete: "name",
						...field("name")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "c-phone",
						children: "رقم الموبايل"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "c-phone",
						inputMode: "tel",
						placeholder: "01xxxxxxxxx",
						...field("phone")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "c-gov",
						children: "المحافظة"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						id: "c-gov",
						className: "h-11 w-full rounded-md border border-line bg-surface px-3.5 text-sm outline-none focus:border-rose focus:ring-2 focus:ring-rose/15",
						value: form.gov,
						onChange: (e) => setForm((f) => ({
							...f,
							gov: e.target.value
						})),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "اختاري المحافظة"
						}), GOVERNORATES.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: g.name,
							children: [
								g.name,
								" — من ",
								g.shipping,
								" ج.م"
							]
						}, g.name))]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "c-area",
						children: "المنطقة / الحي"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "c-area",
						...field("area")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "c-address",
						children: "العنوان بالتفصيل"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "c-address",
						rows: 2,
						...field("address")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "c-notes",
						children: "ملاحظات"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "c-notes",
						rows: 2,
						placeholder: "مقاس إضافي، موعد مناسب...",
						...field("notes")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						onClick: submit,
						disabled: cart.length === 0,
						children: "إرسال الطلب على واتساب"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-5 text-muted",
						children: "بعد الرسالة هنتأكد معاكي من التوفر والشحن. تثبيت الطلب بيتم بالاتفاق على عربون حسب سياسة المتجر."
					})
				]
			})]
		})] })
	});
}
function SiteFooter() {
	const navigate = useNavigate();
	const setActiveCat = useShop((s) => s.setActiveCat);
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-auto bg-ink text-ink-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-2 md:col-span-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl text-rose-fg",
						children: "Elegant Touch"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-7 text-muted",
						children: "إكسسوارات ومجوهرات ستانلس ستيل مطلي ذهب، وحقائب مختارة. الطلب من الموقع، والتأكيد على واتساب."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm font-semibold text-rose-fg",
					children: "تسوقي"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-sm text-muted",
					children: CATEGORIES.filter((c) => c.id !== "all").map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "hover:text-rose-fg",
						onClick: () => {
							setActiveCat(c.id);
							navigate({ to: "/" });
							requestAnimationFrame(() => {
								document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
							});
						},
						children: c.label
					}) }, c.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm font-semibold text-rose-fg",
					children: "خدمة العملاء"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `https://wa.me/${STORE.whatsapp}`,
							target: "_blank",
							rel: "noreferrer",
							className: "hover:text-rose-fg",
							children: "واتساب"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#shipping",
							className: "hover:text-rose-fg",
							children: "الشحن والتوصيل"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#shipping",
							className: "hover:text-rose-fg",
							children: "الاستبدال"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm font-semibold text-rose-fg",
					children: "تابعينا"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: STORE.instagram,
							target: "_blank",
							rel: "noreferrer",
							className: "hover:text-rose-fg",
							children: "إنستجرام"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: STORE.facebook,
							target: "_blank",
							rel: "noreferrer",
							className: "hover:text-rose-fg",
							children: "فيسبوك"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: STORE.tiktok,
							target: "_blank",
							rel: "noreferrer",
							className: "hover:text-rose-fg",
							children: "تيك توك"
						}) })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "border-t border-white/10 py-5 text-center text-xs text-muted",
			children: [
				"© ",
				year,
				" Elegant Touch. جميع الحقوق محفوظة."
			]
		})]
	});
}
function useDark() {
	const [dark, setDark] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setDark(document.documentElement.classList.contains("dark"));
	}, []);
	const toggle = () => {
		const next = !document.documentElement.classList.contains("dark");
		document.documentElement.classList.toggle("dark", next);
		localStorage.setItem("et-theme", next ? "dark" : "light");
		setDark(next);
	};
	return {
		dark,
		toggle
	};
}
function useHydrated() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	return ready;
}
function SiteHeader() {
	const navigate = useNavigate();
	const { dark, toggle } = useDark();
	const hydrated = useHydrated();
	const cartCount = useShop((s) => s.cart.reduce((n, l) => n + l.qty, 0));
	const favCount = useShop((s) => s.favorites.length);
	const menuOpen = useShop((s) => s.menuOpen);
	const setMenuOpen = useShop((s) => s.setMenuOpen);
	const setCartOpen = useShop((s) => s.setCartOpen);
	const setActiveCat = useShop((s) => s.setActiveCat);
	function goCategory(id) {
		setActiveCat(id);
		setMenuOpen(false);
		navigate({ to: "/" });
		requestAnimationFrame(() => {
			document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-rose-dark px-4 py-2 text-center text-xs text-rose-fg sm:text-sm",
			children: "توصيل لكل محافظات مصر · اطلبي من الموقع وأكّدي على واتساب"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "border-b border-line bg-surface",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-11 items-center justify-center md:hidden",
						"aria-label": menuOpen ? "إغلاق القائمة" : "فتح القائمة",
						onClick: () => setMenuOpen(!menuOpen),
						children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2",
						onClick: () => setMenuOpen(false),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-8 items-center justify-center rounded-full border border-rose text-[11px] font-semibold tracking-wide text-rose",
							children: "ET"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl font-semibold tracking-tight text-rose sm:text-2xl",
							children: "Elegant Touch"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-6 text-sm font-medium md:flex",
						children: [CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => goCategory(c.id),
							className: "text-fg hover:text-rose",
							children: c.label
						}, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#about",
							className: "text-fg hover:text-rose",
							children: "من نحن"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "flex size-11 items-center justify-center",
								"aria-label": "الوضع الليلي",
								onClick: toggle,
								children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/favorites",
								"aria-label": "المفضلة",
								className: "relative flex size-11 items-center justify-center",
								onClick: () => setMenuOpen(false),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-5" }), hydrated && favCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-1 left-1 flex size-4 items-center justify-center rounded-full bg-rose text-[10px] text-rose-fg",
									children: favCount
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "relative flex size-11 items-center justify-center",
								"aria-label": "السلة",
								onClick: () => setCartOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("absolute top-1 left-1 flex size-4 items-center justify-center rounded-full bg-rose text-[10px] text-rose-fg", (!hydrated || cartCount === 0) && "hidden"),
									children: cartCount
								})]
							})
						]
					})
				]
			}), menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1 border-t border-line px-4 py-3 md:hidden",
				children: [CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => goCategory(c.id),
					className: "h-11 rounded-md px-2 text-right text-sm hover:bg-elevated",
					children: c.label
				}, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/#about",
					className: "flex h-11 items-center px-2 text-sm",
					onClick: () => setMenuOpen(false),
					children: "من نحن"
				})]
			}) : null]
		})]
	});
}
function WhatsAppFab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: helpWhatsAppUrl(),
		target: "_blank",
		rel: "noreferrer",
		"aria-label": "تواصلي على واتساب",
		className: "fixed bottom-5 left-5 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-rose-fg shadow-soft transition-transform duration-200 hover:-translate-y-0.5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-6 fill-current" })
	});
}
function SiteShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutDialog, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppFab, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				dir: "rtl",
				richColors: false
			})
		]
	});
}
var styles_default = "/assets/styles-DCJ6hGVu.css";
var Route$3 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Elegant Touch | إكسسوارات ومجوهرات" },
			{
				name: "description",
				content: "خواتم ستانلس ستيل مطلي ذهب، حقائب وإكسسوارات. توصيل لكل محافظات مصر وطلب عبر واتساب."
			},
			{
				name: "theme-color",
				content: "#9B3A52"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ar",
		dir: "rtl",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `try{if(localStorage.getItem('et-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}` } }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$2 = () => import("./routes-Nc-tETQA.mjs");
var Route$2 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./favorites-ClKhlZus.mjs");
var Route$1 = createFileRoute("/favorites")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./product._id-CbtGOFkB.mjs");
var Route = createFileRoute("/product/$id")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: ({ params }) => {
		const product = getProduct(params.id);
		return { meta: [{ title: product ? `${product.name} | Elegant Touch` : "المنتج غير موجود | Elegant Touch" }] };
	}
});
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	FavoritesRoute: Route$1.update({
		id: "/favorites",
		path: "/favorites",
		getParentRoute: () => Route$3
	}),
	ProductIdRoute: Route.update({
		id: "/product/$id",
		path: "/product/$id",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: NotFound
	});
}
//#endregion
export { Input as a, NotFound as c, Label as i, Route as n, helpWhatsAppUrl as o, Textarea as r, openWhatsApp as s, router_exports as t };
