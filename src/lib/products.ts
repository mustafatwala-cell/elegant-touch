export type CategoryId = "jewellery" | "bags" | "accessories" | "gifts";

export type Product = {
  id: number;
  name: string;
  price: number;
  cat: CategoryId;
  img: string;
  images: string[];
  desc: string;
  sizes?: string[];
  material: string;
  stock: "متوفر" | "كمية محدودة";
  features: string[];
  featured?: boolean;
};

export const CATEGORIES: { id: "all" | CategoryId; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "jewellery", label: "مجوهرات" },
  { id: "bags", label: "حقائب" },
  { id: "accessories", label: "إكسسوارات" },
  { id: "gifts", label: "هدايا" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "خاتم طبقات النجمة",
    price: 200,
    cat: "jewellery",
    img: "/products/ring-0.jpg",
    images: ["/products/ring-0.jpg"],
    desc: "خاتم ملتف بطبقات ذهبية وتاج نجمة مرصّع بزركون. القطعة الظاهرة في الصورة هي المنتج الفعلي — ستانلس ستيل مطلي ذهب، خفيف ومناسب للبس اليومي.",
    sizes: ["5"],
    material: "ستانلس ستيل مطلي ذهب",
    stock: "متوفر",
    features: ["لا يصدأ ولا يغيّر لون الإيد", "زركون ثابت", "مناسب للاستخدام اليومي"],
    featured: true,
  },
  {
    id: 2,
    name: "خاتم تاج الزركون",
    price: 300,
    cat: "jewellery",
    img: "/products/ring-1.jpg",
    images: ["/products/ring-1.jpg"],
    desc: "تصميم تاج أوضح وحجر أوسط أكبر. نفس خط الستانلس المطلي ذهب، بمقاس أوسع يناسب إيد أكبر شوية.",
    sizes: ["6"],
    material: "ستانلس ستيل مطلي ذهب",
    stock: "متوفر",
    features: ["حجر أوسط أوضح", "طبقات ملتفّة", "طلاء ثابت"],
    featured: true,
  },
  {
    id: 3,
    name: "خاتم ملتف يومي",
    price: 165,
    cat: "jewellery",
    img: "/products/ring-2.jpg",
    images: ["/products/ring-2.jpg"],
    desc: "أخف الخواتم في الخط وأقرب للبس اليومي. طبقات ذهبية ناعمة وحجر وسط صغير يناسب الإيد من غير ما يبقى تقيل.",
    sizes: ["5"],
    material: "ستانلس ستيل مطلي ذهب",
    stock: "متوفر",
    features: ["خفيف على الإيد", "سعر مدخل للخط", "يلبس مع أي إطلالة"],
    featured: true,
  },
  {
    id: 4,
    name: "خاتم زركون كلاسيكي",
    price: 190,
    cat: "jewellery",
    img: "/products/ring-3.jpg",
    images: ["/products/ring-3.jpg"],
    desc: "توازن بين التاج والحجر — مناسب لو عايزة شكل فخم من غير مبالغة. المقاس 6.",
    sizes: ["6"],
    material: "ستانلس ستيل مطلي ذهب",
    stock: "متوفر",
    features: ["تاج ناعم", "يلبس في المناسبات واليومي", "طلاء ذهب ثابت"],
    featured: true,
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
    features: ["حجر دائري كبير", "تاج بارز", "شكل مميز عن باقي الخط"],
    featured: true,
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
    features: ["قابل للتعديل", "تشطيب مطفي", "يومي ومريح"],
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
    features: ["سلسلة قابلة للضبط", "خفيفة على الرقبة", "تليق مع التيشيرت والقميص"],
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
    features: ["خفيفة", "مش بتضيّق", "علبة بسيطة مع المنتج"],
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
    features: ["حزام قابل للفصل", "جيب داخلي", "هاردوير ذهبي مطفي"],
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
    features: ["حماية UV400", "إطار ثابت", "ييجي مع جراب"],
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
    features: ["جيوب كروت", "خياطة متينة", "لون جمل دافي"],
  },
  {
    id: 12,
    name: "حزام جلد كلاسيكي",
    price: 210,
    cat: "accessories",
    img: "/products/belt.jpg",
    images: ["/products/belt.jpg"],
    desc: "حزام جلد رفيع بإبزيم ذهبي مطفي. يتلبس مع الجينز والفستان.",
    sizes: ["S", "M", "L", "XL"],
    material: "جلد",
    stock: "متوفر",
    features: ["إبزيم مطفي", "عرض عملي", "مقاسات متعددة"],
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
    features: ["لمعة هادية", "خفيف", "لون متعدد الاستعمال"],
  },
  {
    id: 14,
    name: "عطر بإطلالة دافئة",
    price: 420,
    cat: "gifts",
    img: "/products/perfume.jpg",
    images: ["/products/perfume.jpg"],
    desc: "عبوة زجاجية أنيقة برائحة دافئة تصلح هدية. اختاري الحجم حسب الاستخدام.",
    sizes: ["30 مل", "50 مل", "100 مل"],
    material: "زجاج",
    stock: "متوفر",
    features: ["عبوة تصلح هدية", "ثبات جيد", "ثلاثة أحجام"],
  },
  {
    id: 15,
    name: "طقم مجوهرات للهدية",
    price: 390,
    cat: "gifts",
    img: "/products/gift-set.jpg",
    images: ["/products/gift-set.jpg"],
    desc: "قلادة وأقراط متناسقين في علبة جاهزة للتقديم. الحل الأسهل لو بتدوري على هدية من غير تفكير زيادة.",
    material: "ستانلس ستيل مطلي ذهب",
    stock: "متوفر",
    features: ["علبة هدايا", "قطعتين متناسقين", "جاهز للتغليف"],
  },
];

export function getProduct(id: string | number) {
  return products.find((p) => String(p.id) === String(id));
}

export function productsByCategory(cat: "all" | CategoryId) {
  return cat === "all" ? products : products.filter((p) => p.cat === cat);
}

export function categoryLabel(cat: CategoryId) {
  return CATEGORIES.find((c) => c.id === cat)?.label ?? cat;
}

export const SEED_REVIEWS: Record<number, { name: string; rating: number; comment: string }[]> = {
  1: [
    { name: "ملك", rating: 5, comment: "الخاتم طلع أوضح من الصورة وثبت على إيدي طول اليوم." },
    { name: "ياسمين", rating: 4, comment: "الشكل فخم والسعر مقبول. المقاس 5 ظبط معايا." },
  ],
  2: [{ name: "نور", rating: 5, comment: "التاج باين وأنيق. وصل القاهرة في ثلاثة أيام." }],
  5: [{ name: "سلمى", rating: 5, comment: "السوليتير مختلف عن باقي الخط وبيليق على الإيد جدًا." }],
  9: [{ name: "هدير", rating: 4, comment: "الشنطة عملية وأكبر شوية من ما توقعت — وده كان كويس." }],
};