import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as cn, c as products, i as categoryLabel, l as useShop, o as formatPrice, r as SEED_REVIEWS, s as getProduct, t as Button } from "./products-ZXuhpxNh.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Star, c as Share2, d as Minus, l as Plus, m as Heart } from "../_libs/lucide-react.mjs";
import { t as ProductCard } from "./product-card-DUiLl6XP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Input, c as NotFound, i as Label, n as Route, r as Textarea, s as openWhatsApp } from "./router-T0iUYzMW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._id-CbtGOFkB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { id } = Route.useParams();
	const product = getProduct(id);
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFound, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductView, { product }, product.id);
}
function ProductView({ product }) {
	const [qty, setQty] = (0, import_react.useState)(1);
	const [size, setSize] = (0, import_react.useState)(product.sizes?.[0] ?? null);
	const [activeImg, setActiveImg] = (0, import_react.useState)(product.img);
	const addToCart = useShop((s) => s.addToCart);
	const setCartOpen = useShop((s) => s.setCartOpen);
	const favorites = useShop((s) => s.favorites);
	const toggleFavorite = useShop((s) => s.toggleFavorite);
	const userReviews = useShop((s) => s.reviews[String(product.id)]);
	const addReview = useShop((s) => s.addReview);
	const loved = favorites.includes(product.id);
	const reviews = (0, import_react.useMemo)(() => {
		const seeds = (SEED_REVIEWS[product.id] ?? []).map((r) => ({
			...r,
			at: 0
		}));
		return [...userReviews ?? [], ...seeds];
	}, [product.id, userReviews]);
	const avg = reviews.length === 0 ? 0 : reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
	const related = products.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 4);
	function add(openCart = false) {
		if (product.sizes?.length && !size) {
			toast.error("اختاري المقاس");
			return;
		}
		addToCart(product, qty, size);
		toast.success("اتضافت للسلة");
		if (openCart) setCartOpen(true);
	}
	async function share() {
		const data = {
			title: product.name,
			text: `${product.name} — ${formatPrice(product.price)}`,
			url: window.location.href
		};
		try {
			if (navigator.share) await navigator.share(data);
			else {
				await navigator.clipboard.writeText(window.location.href);
				toast.success("تم نسخ الرابط");
			}
		} catch {}
	}
	function buyNow() {
		if (product.sizes?.length && !size) {
			toast.error("اختاري المقاس");
			return;
		}
		const total = product.price * qty;
		openWhatsApp(`مرحباً Elegant Touch، أود طلب:\n${product.name}\nالسعر: ${product.price} ج.م\nالمقاس: ${size ?? "غير محدد"}\nالكمية: ${qty}\nالإجمالي: ${total} ج.م\nرابط المنتج: ${window.location.href}\nبرجاء تأكيد التوفر والشحن.`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mb-6 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-rose",
						children: "المتجر"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-2",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: categoryLabel(product.cat) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-2",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: product.name
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-8 md:grid-cols-2 md:gap-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl bg-elevated",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: activeImg,
						alt: product.name,
						className: "aspect-square w-full object-cover"
					})
				}), product.images.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex gap-2 overflow-x-auto pb-1",
					children: product.images.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setActiveImg(src),
						"aria-label": `صورة ${i + 1}`,
						className: cn("size-20 shrink-0 overflow-hidden rounded-md border-2", activeImg === src ? "border-rose" : "border-line"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src,
							alt: "",
							className: "h-full w-full object-cover"
						})
					}, src))
				}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-surface p-6 md:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: categoryLabel(product.cat)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl font-semibold",
								children: product.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "المفضلة",
								onClick: () => toggleFavorite(product.id),
								className: cn("flex size-11 shrink-0 items-center justify-center rounded-full border border-line", loved && "text-rose"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-5", loved && "fill-current") })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-2xl font-semibold tabular-nums text-rose",
							children: formatPrice(product.price)
						}),
						reviews.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 flex items-center gap-1 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 fill-current text-rose" }),
								avg.toFixed(1),
								" · ",
								reviews.length,
								" تقييم"
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 leading-8 text-muted",
							children: product.desc
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-6 divide-y divide-line rounded-lg bg-elevated px-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "الخامة"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: product.material })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "الحالة"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-rose",
									children: product.stock
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 list-disc space-y-1 pr-5 text-sm leading-7 text-muted",
							children: product.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: f }, f))
						}),
						product.sizes?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-sm font-medium",
									children: "المقاس"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: product.sizes.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setSize(z),
										className: cn("h-11 min-w-11 rounded-full border px-4 text-sm", size === z ? "border-rose bg-rose text-rose-fg" : "border-line bg-surface"),
										children: z
									}, z))
								}),
								/^\d+$/.test(product.sizes[0] ?? "") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-muted",
									children: "المقاس بنظام أمريكي. مش متأكدة؟ ابعتي قياس محيط الإصبع على واتساب."
								}) : null
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-sm font-medium",
								children: "الكمية"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "flex size-10 items-center justify-center rounded-full bg-elevated",
										onClick: () => setQty((q) => Math.max(1, q - 1)),
										"aria-label": "تقليل",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-6 text-center tabular-nums",
										children: qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "flex size-10 items-center justify-center rounded-full bg-elevated",
										onClick: () => setQty((q) => q + 1),
										"aria-label": "زيادة",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ink",
								onClick: () => add(true),
								children: "أضيفي للسلة"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: buyNow,
								children: "اطلبي الآن"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "mt-3 w-full",
							onClick: share,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), "مشاركة المنتج"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 rounded-lg bg-elevated p-4 text-sm leading-7 text-muted",
							children: "الشحن لكل محافظات مصر. التقدير يظهر عند كتابة المحافظة في الطلب، والتأكيد النهائي على واتساب قبل أي دفع."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewsBlock, {
				reviews,
				onSubmit: (name, rating, comment) => addReview(product.id, {
					name,
					rating,
					comment
				})
			}),
			related.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-6 text-xl font-semibold",
					children: "قطع مشابهة"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: related.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
				})]
			}) : null
		]
	});
}
function ReviewsBlock({ reviews, onSubmit }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [rating, setRating] = (0, import_react.useState)(5);
	const [comment, setComment] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-12 rounded-xl bg-surface p-6 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold",
				children: "تقييمات العميلات"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 space-y-3",
				children: [reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "كن أول من يقيّم القطعة."
				}) : null, reviews.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg bg-elevated p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-sm",
							children: r.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-rose",
							children: ["★".repeat(r.rating), "☆".repeat(5 - r.rating)]
						})]
					}), r.comment ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-7 text-muted",
						children: r.comment
					}) : null]
				}, `${r.name}-${i}`))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				className: "mt-5 w-full",
				onClick: () => setOpen((v) => !v),
				children: "أضيفي تقييمك"
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 space-y-3",
				onSubmit: (e) => {
					e.preventDefault();
					if (!name.trim()) {
						toast.error("اكتبي اسمك");
						return;
					}
					onSubmit(name.trim(), rating, comment.trim());
					setName("");
					setComment("");
					setRating(5);
					setOpen(false);
					toast.success("شكرًا لتقييمك");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "rev-name",
						children: "الاسم"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "rev-name",
						value: name,
						onChange: (e) => setName(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "التقييم" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1",
						children: [
							1,
							2,
							3,
							4,
							5
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setRating(n),
							className: "size-10 text-xl text-rose",
							"aria-label": `${n} نجوم`,
							children: n <= rating ? "★" : "☆"
						}, n))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "rev-c",
						children: "تعليق"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "rev-c",
						value: comment,
						onChange: (e) => setComment(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						children: "إرسال"
					})
				]
			}) : null
		]
	});
}
//#endregion
export { ProductPage as component };
