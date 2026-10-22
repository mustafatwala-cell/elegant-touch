-- ==============================================================================
-- Migration: 0003_seed_products.sql
-- Purpose: Seed the initial 20 Elegant Touch products from src/lib/products.ts.
-- Safety: 100% IDEMPOTENT & NON-DESTRUCTIVE.
--         Uses ON CONFLICT (id) DO NOTHING: Existing product IDs are NEVER overwritten.
-- Note on count:
--         The array in src/lib/products.ts contains exactly 20 products.
--         The IDs range from 1 to 21 because ID 16 is intentionally absent in the
--         source data (jumps from 15 directly to 17).
-- ==============================================================================

INSERT INTO public.products (id, name, price, cat, img, images, "desc", sizes, material, stock, features, featured)
VALUES
(
    1,
    'خاتم طبقات النجمة',
    200,
    'jewellery',
    '/products/ring-0.jpg',
    ARRAY['/products/ring-0.jpg'],
    'خاتم ملتف بطبقات ذهبية وتاج نجمة مرصّع بزركون. القطعة الظاهرة في الصورة هي المنتج الفعلي — ستانلس ستيل مطلي ذهب، خفيف ومناسب للبس اليومي.',
    ARRAY['5'],
    'ستانلس ستيل مطلي ذهب',
    'متوفر',
    ARRAY['لا يصدأ ولا يغيّر لون الإيد', 'زركون ثابت', 'مناسب للاستخدام اليومي'],
    true
),
(
    2,
    'خاتم تاج الزركون',
    300,
    'jewellery',
    '/products/ring-1.jpg',
    ARRAY['/products/ring-1.jpg'],
    'تصميم تاج أوضح وحجر أوسط أكبر. نفس خط الستانلس المطلي ذهب، بمقاس أوسع يناسب إيد أكبر شوية.',
    ARRAY['6'],
    'ستانلس ستيل مطلي ذهب',
    'متوفر',
    ARRAY['حجر أوسط أوضح', 'طبقات ملتفّة', 'طلاء ثابت'],
    true
),
(
    3,
    'خاتم ملتف يومي',
    165,
    'jewellery',
    '/products/ring-2.jpg',
    ARRAY['/products/ring-2.jpg'],
    'أخف الخواتم في الخط وأقرب للبس اليومي. طبقات ذهبية ناعمة وحجر وسط صغير يناسب الإيد من غير ما يبقى تقيل.',
    ARRAY['5'],
    'ستانلس ستيل مطلي ذهب',
    'متوفر',
    ARRAY['خفيف على الإيد', 'سعر مدخل للخط', 'يلبس مع أي إطلالة'],
    true
),
(
    4,
    'خاتم زركون كلاسيكي',
    190,
    'jewellery',
    '/products/ring-3.jpg',
    ARRAY['/products/ring-3.jpg'],
    'توازن بين التاج والحجر — مناسب لو عايزة شكل فخم من غير مبالغة. المقاس 6.',
    ARRAY['6'],
    'ستانلس ستيل مطلي ذهب',
    'متوفر',
    ARRAY['تاج ناعم', 'يلبس في المناسبات واليومي', 'طلاء ذهب ثابت'],
    true
),
(
    5,
    'خاتم سوليتير متوج',
    300,
    'jewellery',
    '/products/ring-4.jpg',
    ARRAY['/products/ring-4.jpg'],
    'حجر دائري في النص مع تاج مدبّب وشريطين مرصّعين. مختلف عن خط الطبقات — أوضح كـ statement على الإيد.',
    ARRAY['5'],
    'ستانلس ستيل مطلي ذهب',
    'كمية محدودة',
    ARRAY['حجر دائري كبير', 'تاج بارز', 'شكل مميز عن باقي الخط'],
    true
),
(
    6,
    'سوار ستانلس ستيل مطفي',
    220,
    'jewellery',
    '/products/bracelet.jpg',
    ARRAY['/products/bracelet.jpg'],
    'سوار مفتوح بتشطيب مطفي لا يصدأ ولا يبهت مع الميه والعرق. يتظبط على المعصم.',
    ARRAY['مقاس واحد قابل للتعديل'],
    'ستانلس ستيل مطفي',
    'متوفر',
    ARRAY['قابل للتعديل', 'تشطيب مطفي', 'يومي ومريح'],
    false
),
(
    7,
    'قلادة سلسلة ذهبية',
    340,
    'jewellery',
    '/products/necklace.jpg',
    ARRAY['/products/necklace.jpg'],
    'قلادة رفيعة مطلية ذهب مع دلاية دائرية بسيطة. السلسلة تتظبط على طولين.',
    ARRAY['40 سم', '45 سم'],
    'ستانلس ستيل مطلي ذهب',
    'متوفر',
    ARRAY['سلسلة قابلة للضبط', 'خفيفة على الرقبة', 'تليق مع التيشيرت والقميص'],
    false
),
(
    8,
    'أقراط لؤلؤ ناعمة',
    260,
    'jewellery',
    '/products/earrings.jpg',
    ARRAY['/products/earrings.jpg'],
    'أقراط لؤلؤ صناعي عالي الجودة، خفيفة ومريحة للشغل والمناسبات.',
    NULL,
    'لؤلؤ صناعي وستانلس مطلي ذهب',
    'متوفر',
    ARRAY['خفيفة', 'مش بتضيّق', 'علبة بسيطة مع المنتج'],
    false
),
(
    9,
    'حقيبة يد جلد',
    780,
    'bags',
    '/products/bag.jpg',
    ARRAY['/products/bag.jpg'],
    'حقيبة يد متوسطة بحزام يتشال. تتسع للموبايل والمحفظة ومفاتيحك من غير ما تبقى كبيرة.',
    NULL,
    'جلد',
    'متوفر',
    ARRAY['حزام قابل للفصل', 'جيب داخلي', 'هاردوير ذهبي مطفي'],
    false
),
(
    10,
    'نظارة شمسية كلاسيكية',
    380,
    'accessories',
    '/products/sunglasses.jpg',
    ARRAY['/products/sunglasses.jpg'],
    'إطار كلاسيكي بعدسات UV400. الشكل يناسب معظم الوشوش ومش مبالغ.',
    NULL,
    'أسيتات وعدسات UV400',
    'متوفر',
    ARRAY['حماية UV400', 'إطار ثابت', 'ييجي مع جراب'],
    false
),
(
    11,
    'محفظة جلد',
    290,
    'accessories',
    '/products/wallet.jpg',
    ARRAY['/products/wallet.jpg'],
    'محفظة جلد مدمجة بجيوب كروت وجيب للعملة. حجمها يدخل في الشنطة الصغيرة.',
    NULL,
    'جلد',
    'متوفر',
    ARRAY['جيوب كروت', 'خياطة متينة', 'لون جمل دافي'],
    false
),
(
    12,
    'حزام جلد كلاسيكي',
    210,
    'accessories',
    '/products/belt.jpg',
    ARRAY['/products/belt.jpg'],
    'حزام جلد رفيع بإبزيم ذهبي مطفي. يتلبس مع الجينز والفستان.',
    ARRAY['S', 'M', 'L', 'XL'],
    'جلد',
    'متوفر',
    ARRAY['إبزيم مطفي', 'عرض عملي', 'مقاسات متعددة'],
    false
),
(
    13,
    'وشاح حريري',
    250,
    'accessories',
    '/products/scarf.jpg',
    ARRAY['/products/scarf.jpg'],
    'وشاح بخامة ناعمة ولون وردي ترابي يقرب من لون البراند. ينفع على الشنطة أو الشعر.',
    NULL,
    'مزيج حريري',
    'متوفر',
    ARRAY['لمعة هادية', 'خفيف', 'لون متعدد الاستعمال'],
    false
),
(
    14,
    'عطر بإطلالة دافئة',
    420,
    'gifts',
    '/products/perfume.jpg',
    ARRAY['/products/perfume.jpg'],
    'عبوة زجاجية أنيقة برائحة دافئة تصلح هدية. اختاري الحجم حسب الاستخدام.',
    ARRAY['30 مل', '50 مل', '100 مل'],
    'زجاج',
    'متوفر',
    ARRAY['عبوة تصلح هدية', 'ثبات جيد', 'ثلاثة أحجام'],
    false
),
(
    15,
    'طقم مجوهرات للهدية',
    390,
    'gifts',
    '/products/gift-set.jpg',
    ARRAY['/products/gift-set.jpg'],
    'قلادة وأقراط متناسقين في علبة جاهزة للتقديم. الحل الأسهل لو بتدوري على هدية من غير تفكير زيادة.',
    NULL,
    'ستانلس ستيل مطلي ذهب',
    'متوفر',
    ARRAY['علبة هدايا', 'قطعتين متناسقين', 'جاهز للتغليف'],
    false
),
(
    17,
    'Crossover Ring',
    140,
    'jewellery',
    '/products/e.g17.jpeg',
    ARRAY['/products/e.g17.jpeg', '/products/e.g17-2.jpeg'],
    'خاتم متداخل ثنائي اللون بتصميم عصري عريض، يجمع بين أشرطة ذهبية ذات ملمس مجدول وخطوط فضية مرصعة بالكامل بالفصوص البراقة، ليمنحكِ مظهر الخواتم المكدسة الأنيق في قطعة واحدة فاخرة.',
    ARRAY['16', '17', '18', '19'],
    'مطلي دهب عيار 18 Gold plated',
    'متوفر',
    ARRAY['أشرطة متداخلة', 'تباين الألوان والملمس', 'فصوص بارزة'],
    true
),
(
    18,
    'Royal Bloom Ring',
    220,
    'jewellery',
    '/products/e.g18.jpeg',
    ARRAY['/products/e.g18.jpeg', '/products/e.g18-2.jpeg', '/products/e.g18-3.jpeg'],
    'Royal Bloom Ring ✨
خاتم بتصميم فاخر يجمع بين الأناقة والأنوثة، بحجر مركزي لامع بتصميم بارز تحيط به تفاصيل مستوحاة من أوراق الزهور وأحجار كريستالية براقة تضيف لمسة ساحرة لكل إطلالة.
تصميم statement يجذب العين، ومناسب لإطلالاتك اليومية والمناسبات الخاصة. 🎀✨

متاح للحجز — قطعة مميزة لعشاق التفاصيل الفاخرة',
    ARRAY['16', '17', '18', '19'],
    'مطلي دهب عيار 18 Gold plated',
    'متوفر',
    ARRAY['تصميم فاخر وملفت بتفاصيل مستوحاة من الزهور', 'حجر مركزي كبير لامع يمنح الخاتم مظهر فخما', 'لون ذهبي انيق يناسب مختلف الاطلالات'],
    true
),
(
    19,
    'Royal Bloom Ring',
    220,
    'jewellery',
    '/products/e.g19.jpeg',
    ARRAY['/products/e.g19.jpeg'],
    'Royal Bloom Ring ✨
خاتم بتصميم فاخر يجمع بين الأناقة والأنوثة، بحجر مركزي لامع بتصميم بارز تحيط به تفاصيل مستوحاة من أوراق الزهور وأحجار كريستالية براقة تضيف لمسة ساحرة لكل إطلالة.
تصميم statement يجذب العين، ومناسب لإطلالاتك اليومية والمناسبات الخاصة. 🎀✨

متاح للحجز — قطعة مميزة لعشاق التفاصيل الفاخرة',
    ARRAY['16', '17', '18', '19'],
    'مطلي دهب عيار 18 Gold plated',
    'متوفر',
    ARRAY['تصميم فاخر وملفت بتفاصيل مستوحاة من الزهور', 'حجر مركزي كبير لامع يمنح الخاتم مظهر فخما', 'لون ذهبي انيق يناسب مختلف الاطلالات'],
    true
),
(
    20,
    'Queen Marquise Ring',
    220,
    'jewellery',
    '/products/e.g20.jpeg',
    ARRAY['/products/e.g20.jpeg', '/products/e.g20.jpeg'],
    'خاتم بتصميم ملكي فاخر يجمع بين الأناقة والفخامة في تفاصيله ✨
يتميز بحجر مركزي Marquise Cut لامع، محاط بتفاصيل من الأحجار اللامعة، مع تصميم متعدد الطبقات يمنحه شكلًا مميزًا وفخمًا على اليد.
قطعة statement تضيف لمسة راقية لأي إطلالة، سواء لوحدها أو مع الـ rings stacking.',
    ARRAY['16', '17', '18', '19'],
    'مطلي دهب عيار 18 Gold plated',
    'متوفر',
    ARRAY['تصميم ملكي فاخر', 'حجر مركزي Marquise cut بتصميم مميز وانيق', 'تصميم مريح وانيق علي اليد'],
    true
),
(
    21,
    'X Diamond Ring',
    140,
    'jewellery',
    '/products/e.g21.jpeg',
    ARRAY['/products/e.g21.jpeg', '/products/e.g21-2.jpeg'],
    'خاتم علي شكل حرف X مرصع بفصوص زيركون اصلية مطلي بماء الذهب يعطي لمسة انيقة لإطلالتك',
    ARRAY['16', '17', '18', '19'],
    'مطلي دهب عيار 18 Gold plated',
    'متوفر',
    ARRAY['شكل الماسي معاصر لبراندات الدهب العالمية'],
    true
)
ON CONFLICT (id) DO NOTHING;

-- Safely synchronize the identity sequence so new inserts without explicit ID will pick up max(id)+1
SELECT setval(
    pg_get_serial_sequence('public.products', 'id'),
    GREATEST(COALESCE((SELECT MAX(id) FROM public.products), 1), 1),
    true
);
