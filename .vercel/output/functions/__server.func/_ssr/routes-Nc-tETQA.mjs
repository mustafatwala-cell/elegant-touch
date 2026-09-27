import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as products, l as useShop, n as CATEGORIES, t as Button } from "./products-ZXuhpxNh.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as MessageCircle, h as ArrowLeft, n as Truck, s as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as ProductCard } from "./product-card-DUiLl6XP.mjs";
import { a as Input, o as helpWhatsAppUrl } from "./router-T0iUYzMW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Nc-tETQA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const activeCat = useShop((s) => s.activeCat);
	const setActiveCat = useShop((s) => s.setActiveCat);
	const [query, setQuery] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)("default");
	const featured = products.filter((p) => p.featured);
	const list = (0, import_react.useMemo)(() => {
		let next = activeCat === "all" ? [...products] : products.filter((p) => p.cat === activeCat);
		const q = query.trim();
		if (q) next = next.filter((p) => `${p.name} ${p.desc}`.includes(q));
		if (sort === "low") next.sort((a, b) => a.price - b.price);
		if (sort === "high") next.sort((a, b) => b.price - a.price);
		return next;
	}, [
		activeCat,
		query,
		sort
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/products/hero.jpg",
				alt: "",
				className: "h-[70vh] min-h-[420px] w-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center",
				style: { background: "linear-gradient(to left, rgb(28 22 20 / 0.78), rgb(28 22 20 / 0.18))" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto w-full max-w-6xl px-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-lg text-ink-fg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm tracking-wide text-rose-fg/80",
								children: "ستانلس ستيل مطلي ذهب"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-3 font-display text-4xl leading-tight sm:text-5xl",
								children: [
									"لمسة أنيقة.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"كل يوم."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-base leading-8 text-ink-fg/85",
								children: "خط جديد من الخواتم والإكسسوارات المختارة بعناية. الصور على الخواتم هي المنتج الفعلي، والطلب بيتأكد معاكي على واتساب."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#rings",
										children: "تسوقي الخواتم"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									size: "lg",
									className: "border-ink-fg/30 bg-transparent text-ink-fg hover:bg-ink-fg/10 hover:text-ink-fg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#products",
										children: "كل المنتجات"
									})
								})]
							})
						]
					})
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-ink",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 py-7 text-sm text-ink-fg sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustItem, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-4" }),
						text: "شحن لكل محافظات مصر"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustItem, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" }),
						text: "ستانلس ستيل لا يصدأ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustItem, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }),
						text: "تأكيد الطلب على واتساب"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "rings",
			className: "mx-auto max-w-6xl px-5 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-rose",
						children: "الخط الجديد"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-3xl font-semibold",
						children: "خواتم على الإيد"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm leading-7 text-muted",
						children: "خمس قطع حقيقية من تصويرنا. كل خاتم باسمه وسعره ومقاسه — مش مجرد كلمة ring."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#products",
						className: "gap-2",
						children: ["باقي المتجر", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5",
				children: featured.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto grid max-w-6xl grid-cols-2 gap-3 px-5 pb-6 md:grid-cols-4 md:gap-4",
			children: [
				[
					"jewellery",
					"مجوهرات",
					"/products/necklace.jpg"
				],
				[
					"bags",
					"حقائب",
					"/products/bag.jpg"
				],
				[
					"accessories",
					"إكسسوارات",
					"/products/sunglasses.jpg"
				],
				[
					"gifts",
					"هدايا",
					"/products/perfume.jpg"
				]
			].map(([id, label, img]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					setActiveCat(id);
					document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
				},
				className: "group relative aspect-portrait overflow-hidden rounded-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: img,
					alt: "",
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-3 py-4 text-right text-sm font-semibold text-ink-fg",
					children: label
				})]
			}, id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "products",
			className: "mx-auto max-w-6xl px-5 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-semibold",
						children: "تسوقي حسب القسم"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "ابحثي بالاسم أو فلترة السعر"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-5 max-w-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "ابحثي عن خاتم، شنطة، هدية...",
						"aria-label": "بحث"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex flex-wrap items-center justify-center gap-2",
					children: [CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setActiveCat(c.id),
						className: `h-10 rounded-full px-4 text-sm ${activeCat === c.id ? "bg-rose text-rose-fg" : "border border-line bg-surface text-fg hover:border-rose"}`,
						children: c.label
					}, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: sort,
						onChange: (e) => setSort(e.target.value),
						className: "h-10 rounded-full border border-line bg-surface px-3 text-sm",
						"aria-label": "ترتيب",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "default",
								children: "الأحدث"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "low",
								children: "السعر: الأقل"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "high",
								children: "السعر: الأعلى"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-4 text-center text-xs text-muted",
					children: [
						"عرض ",
						list.length,
						" من ",
						products.length,
						" منتج"
					]
				}),
				list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-16 text-center text-muted",
					children: "مفيش نتائج. جرّبي كلمة تانية أو قسم مختلف."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5",
					children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "about",
			className: "border-t border-line bg-elevated",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-semibold",
						children: "من نحن"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-8 text-muted",
						children: "Elegant Touch متجر مصري للإكسسوارات والمجوهرات والحقائب. بنركّز على قطع تقدري تلبسيها كل يوم: ستانلس ستيل مطلي ذهب، وتصوير حقيقي للخواتم مش صور كتالوج جاهزة."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-8 text-muted",
						children: "بتختاري من الموقع، بتبعثي الطلب على واتساب، وبعدين نأكد التوفر وسعر الشحن لمحافظتك قبل أي دفع."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: helpWhatsAppUrl(),
							target: "_blank",
							rel: "noreferrer",
							children: "اسألي على واتساب"
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "shipping",
					className: "rounded-xl border border-line bg-surface p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold",
							children: "الشحن والاستبدال"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-3 text-sm leading-7 text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "الشحن لكل المحافظات. التقدير يظهر عند اختيار المحافظة في الطلب، والتكلفة النهائية قبل التثبيت." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "مدة التوصيل عادة من 2 إلى 5 أيام عمل حسب المنطقة." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "لو في مشكلة في المنتج، ابعتي صور على واتساب قبل أي استبدال." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "تثبيت الطلب يتم بالاتفاق على عربون بعد تأكيد الشحن — مش قبل ما نكلمك." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/product/$id",
							params: { id: "1" },
							className: "mt-5 inline-block text-sm text-rose hover:underline",
							children: "شوفي خاتم طبقات النجمة"
						})
					]
				})]
			})
		})
	] });
}
function TrustItem({ icon, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-center gap-2",
		children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text })]
	});
}
//#endregion
export { Home as component };
