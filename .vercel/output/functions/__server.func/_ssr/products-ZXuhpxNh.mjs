import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-ZXuhpxNh.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatPrice(n) {
	return `${n.toLocaleString("en-EG")} ج.م`;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[background-color,color,transform,opacity] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose/40", {
	variants: {
		variant: {
			default: "bg-rose text-rose-fg hover:bg-rose-dark",
			ink: "bg-ink text-ink-fg hover:bg-rose",
			outline: "border border-line bg-surface text-fg hover:border-rose hover:text-rose",
			ghost: "text-fg hover:bg-elevated",
			whatsapp: "bg-whatsapp text-rose-fg hover:opacity-90"
		},
		size: {
			default: "h-11 rounded-full px-5 text-sm",
			sm: "h-9 rounded-full px-4 text-sm",
			lg: "h-12 rounded-full px-7 text-sm",
			icon: "size-11 rounded-full"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function lineKey(productId, size) {
	return `${productId}::${size ?? ""}`;
}
var useShop = create()(persist((set, get) => ({
	cart: [],
	favorites: [],
	reviews: {},
	cartOpen: false,
	checkoutOpen: false,
	menuOpen: false,
	activeCat: "all",
	setCartOpen: (cartOpen) => set({
		cartOpen,
		menuOpen: false
	}),
	setCheckoutOpen: (checkoutOpen) => set({ checkoutOpen }),
	setMenuOpen: (menuOpen) => set({ menuOpen }),
	setActiveCat: (activeCat) => set({
		activeCat,
		menuOpen: false
	}),
	addToCart: (product, qty, size) => {
		const key = lineKey(product.id, size);
		const cart = [...get().cart];
		const existing = cart.find((l) => l.key === key);
		if (existing) existing.qty += qty;
		else cart.push({
			key,
			productId: product.id,
			name: product.name,
			price: product.price,
			img: product.img,
			size,
			qty
		});
		set({ cart });
	},
	changeQty: (key, delta) => {
		set({ cart: get().cart.map((l) => l.key === key ? {
			...l,
			qty: l.qty + delta
		} : l).filter((l) => l.qty > 0) });
	},
	removeFromCart: (key) => set({ cart: get().cart.filter((l) => l.key !== key) }),
	clearCart: () => set({ cart: [] }),
	toggleFavorite: (id) => {
		set({ favorites: get().favorites.includes(id) ? get().favorites.filter((x) => x !== id) : [...get().favorites, id] });
	},
	addReview: (productId, review) => {
		const id = String(productId);
		const current = get().reviews[id] ?? [];
		set({ reviews: {
			...get().reviews,
			[id]: [{
				...review,
				at: Date.now()
			}, ...current]
		} });
	},
	cartCount: () => get().cart.reduce((s, l) => s + l.qty, 0),
	cartTotal: () => get().cart.reduce((s, l) => s + l.price * l.qty, 0)
}), {
	name: "et-shop",
	partialize: (s) => ({
		cart: s.cart,
		favorites: s.favorites,
		reviews: s.reviews
	})
}));
var CATEGORIES = [
	{
		id: "all",
		label: "الكل"
	},
	{
		id: "jewellery",
		label: "مجوهرات"
	},
	{
		id: "bags",
		label: "حقائب"
	},
	{
		id: "accessories",
		label: "إكسسوارات"
	},
	{
		id: "gifts",
		label: "هدايا"
	}
];
var products = [
	{
		id: 1,
		name: "خاتم طبقات النجمة",
		price: 200,
		cat: "jewellery",
		img: "/products/ring-0.jpg",
		images: ["/products/ring-0.jpg", "/products/ring-1.jpg"],
		desc: "خاتم ملتف بطبقات ذهبية وتاج نجمة مرصّع بزركون. القطعة الظاهرة في الصورة هي المنتج الفعلي — ستانلس ستيل مطلي ذهب، خفيف ومناسب للبس اليومي.",
		sizes: ["5"],
		material: "ستانلس ستيل مطلي ذهب",
		stock: "متوفر",
		features: [
			"لا يصدأ ولا يغيّر لون الإيد",
			"زركون ثابت",
			"مناسب للاستخدام اليومي"
		],
		featured: true
	},
	{
		id: 2,
		name: "خاتم تاج الزركون",
		price: 300,
		cat: "jewellery",
		img: "/products/ring-1.jpg",
		images: [
			"/products/ring-1.jpg",
			"/products/ring-0.jpg",
			"/products/ring-3.jpg"
		],
		desc: "تصميم تاج أوضح وحجر أوسط أكبر. نفس خط الستانلس المطلي ذهب، بمقاس أوسع يناسب إيد أكبر شوية.",
		sizes: ["6"],
		material: "ستانلس ستيل مطلي ذهب",
		stock: "متوفر",
		features: [
			"حجر أوسط أوضح",
			"طبقات ملتفّة",
			"طلاء ثابت"
		],
		featured: true
	},
	{
		id: 3,
		name: "خاتم ملتف يومي",
		price: 165,
		cat: "jewellery",
		img: "/products/ring-2.jpg",
		images: ["/products/ring-2.jpg", "/products/ring-0.jpg"],
		desc: "أخف الخواتم في الخط وأقرب للبس اليومي. طبقات ذهبية ناعمة وحجر وسط صغير يناسب الإيد من غير ما يبقى تقيل.",
		sizes: ["5"],
		material: "ستانلس ستيل مطلي ذهب",
		stock: "متوفر",
		features: [
			"خفيف على الإيد",
			"سعر مدخل للخط",
			"يلبس مع أي إطلالة"
		],
		featured: true
	},
	{
		id: 4,
		name: "خاتم زركون كلاسيكي",
		price: 190,
		cat: "jewellery",
		img: "/products/ring-3.jpg",
		images: ["/products/ring-3.jpg", "/products/ring-1.jpg"],
		desc: "توازن بين التاج والحجر — مناسب لو عايزة شكل فخم من غير مبالغة. المقاس 6.",
		sizes: ["6"],
		material: "ستانلس ستيل مطلي ذهب",
		stock: "متوفر",
		features: [
			"تاج ناعم",
			"يلبس في المناسبات واليومي",
			"طلاء ذهب ثابت"
		],
		featured: true
	},
	{
		id: 5,
		name: "خاتم سوليتير متوج",
		price: 300,
		cat: "jewellery",
		img: "/products/ring-4.jpg",
		images: ["/products/ring-4.jpg"],
		desc: "حجر دائري في النص مع تاج مدبّب وشريطين مرصّعين. مختلف عن خط الطبقات — أوضح كـ statement على الإيد.",
		sizes: ["5"],
		material: "ستانلس ستيل مطلي ذهب",
		stock: "كمية محدودة",
		features: [
			"حجر دائري كبير",
			"تاج بارز",
			"شكل مميز عن باقي الخط"
		],
		featured: true
	},
	{
		id: 6,
		name: "سوار ستانلس ستيل مطفي",
		price: 220,
		cat: "jewellery",
		img: "/products/bracelet.jpg",
		images: ["/products/bracelet.jpg"],
		desc: "سوار مفتوح بتشطيب مطفي لا يصدأ ولا يبهت مع الميه والعرق. يتظبط على المعصم.",
		sizes: ["مقاس واحد قابل للتعديل"],
		material: "ستانلس ستيل مطفي",
		stock: "متوفر",
		features: [
			"قابل للتعديل",
			"تشطيب مطفي",
			"يومي ومريح"
		]
	},
	{
		id: 7,
		name: "قلادة سلسلة ذهبية",
		price: 340,
		cat: "jewellery",
		img: "/products/necklace.jpg",
		images: ["/products/necklace.jpg"],
		desc: "قلادة رفيعة مطلية ذهب مع دلاية دائرية بسيطة. السلسلة تتظبط على طولين.",
		sizes: ["40 سم", "45 سم"],
		material: "ستانلس ستيل مطلي ذهب",
		stock: "متوفر",
		features: [
			"سلسلة قابلة للضبط",
			"خفيفة على الرقبة",
			"تليق مع التيشيرت والقميص"
		]
	},
	{
		id: 8,
		name: "أقراط لؤلؤ ناعمة",
		price: 260,
		cat: "jewellery",
		img: "/products/earrings.jpg",
		images: ["/products/earrings.jpg"],
		desc: "أقراط لؤلؤ صناعي عالي الجودة، خفيفة ومريحة للشغل والمناسبات.",
		material: "لؤلؤ صناعي وستانلس مطلي ذهب",
		stock: "متوفر",
		features: [
			"خفيفة",
			"مش بتضيّق",
			"علبة بسيطة مع المنتج"
		]
	},
	{
		id: 9,
		name: "حقيبة يد جلد",
		price: 780,
		cat: "bags",
		img: "/products/bag.jpg",
		images: ["/products/bag.jpg"],
		desc: "حقيبة يد متوسطة بحزام يتشال. تتسع للموبايل والمحفظة ومفاتيحك من غير ما تبقى كبيرة.",
		material: "جلد",
		stock: "متوفر",
		features: [
			"حزام قابل للفصل",
			"جيب داخلي",
			"هاردوير ذهبي مطفي"
		]
	},
	{
		id: 10,
		name: "نظارة شمسية كلاسيكية",
		price: 380,
		cat: "accessories",
		img: "/products/sunglasses.jpg",
		images: ["/products/sunglasses.jpg"],
		desc: "إطار كلاسيكي بعدسات UV400. الشكل يناسب معظم الوشوش ومش مبالغ.",
		material: "أسيتات وعدسات UV400",
		stock: "متوفر",
		features: [
			"حماية UV400",
			"إطار ثابت",
			"ييجي مع جراب"
		]
	},
	{
		id: 11,
		name: "محفظة جلد",
		price: 290,
		cat: "accessories",
		img: "/products/wallet.jpg",
		images: ["/products/wallet.jpg"],
		desc: "محفظة جلد مدمجة بجيوب كروت وجيب للعملة. حجمها يدخل في الشنطة الصغيرة.",
		material: "جلد",
		stock: "متوفر",
		features: [
			"جيوب كروت",
			"خياطة متينة",
			"لون جمل دافي"
		]
	},
	{
		id: 12,
		name: "حزام جلد كلاسيكي",
		price: 210,
		cat: "accessories",
		img: "/products/belt.jpg",
		images: ["/products/belt.jpg"],
		desc: "حزام جلد رفيع بإبزيم ذهبي مطفي. يتلبس مع الجينز والفستان.",
		sizes: [
			"S",
			"M",
			"L",
			"XL"
		],
		material: "جلد",
		stock: "متوفر",
		features: [
			"إبزيم مطفي",
			"عرض عملي",
			"مقاسات متعددة"
		]
	},
	{
		id: 13,
		name: "وشاح حريري",
		price: 250,
		cat: "accessories",
		img: "/products/scarf.jpg",
		images: ["/products/scarf.jpg"],
		desc: "وشاح بخامة ناعمة ولون وردي ترابي يقرب من لون البراند. ينفع على الشنطة أو الشعر.",
		material: "مزيج حريري",
		stock: "متوفر",
		features: [
			"لمعة هادية",
			"خفيف",
			"لون متعدد الاستعمال"
		]
	},
	{
		id: 14,
		name: "عطر بإطلالة دافئة",
		price: 420,
		cat: "gifts",
		img: "/products/perfume.jpg",
		images: ["/products/perfume.jpg"],
		desc: "عبوة زجاجية أنيقة برائحة دافئة تصلح هدية. اختاري الحجم حسب الاستخدام.",
		sizes: [
			"30 مل",
			"50 مل",
			"100 مل"
		],
		material: "زجاج",
		stock: "متوفر",
		features: [
			"عبوة تصلح هدية",
			"ثبات جيد",
			"ثلاثة أحجام"
		]
	},
	{
		id: 15,
		name: "طقم مجوهرات للهدية",
		price: 390,
		cat: "gifts",
		img: "/products/gift-set.jpg",
		images: [
			"/products/gift-set.jpg",
			"/products/necklace.jpg",
			"/products/earrings.jpg"
		],
		desc: "قلادة وأقراط متناسقين في علبة جاهزة للتقديم. الحل الأسهل لو بتدوري على هدية من غير تفكير زيادة.",
		material: "ستانلس ستيل مطلي ذهب",
		stock: "متوفر",
		features: [
			"علبة هدايا",
			"قطعتين متناسقين",
			"جاهز للتغليف"
		]
	}
];
function getProduct(id) {
	return products.find((p) => String(p.id) === String(id));
}
function categoryLabel(cat) {
	return CATEGORIES.find((c) => c.id === cat)?.label ?? cat;
}
var SEED_REVIEWS = {
	1: [{
		name: "ملك",
		rating: 5,
		comment: "الخاتم طلع أوضح من الصورة وثبت على إيدي طول اليوم."
	}, {
		name: "ياسمين",
		rating: 4,
		comment: "الشكل فخم والسعر مقبول. المقاس 5 ظبط معايا."
	}],
	2: [{
		name: "نور",
		rating: 5,
		comment: "التاج باين وأنيق. وصل القاهرة في ثلاثة أيام."
	}],
	5: [{
		name: "سلمى",
		rating: 5,
		comment: "السوليتير مختلف عن باقي الخط وبيليق على الإيد جدًا."
	}],
	9: [{
		name: "هدير",
		rating: 4,
		comment: "الشنطة عملية وأكبر شوية من ما توقعت — وده كان كويس."
	}]
};
//#endregion
export { cn as a, products as c, categoryLabel as i, useShop as l, CATEGORIES as n, formatPrice as o, SEED_REVIEWS as r, getProduct as s, Button as t };
