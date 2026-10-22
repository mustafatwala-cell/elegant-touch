import { createClient } from "@supabase/supabase-js";
import type { Product, CategoryId } from "./products";

// Read strictly from Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ [Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in environment variables.");
}

// Client initialization using ONLY Vite env vars and anon key
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder"
);

export type SupabaseOrderPayload = {
  customer_name: string;
  phone: string;
  governorate: string;
  area?: string | null;
  address: string;
  notes?: string | null;
  items: Array<{
    name: string;
    size?: string | null;
    qty: number;
    price: number;
  }>;
  items_total: number;
  shipping_estimate?: number | null;
};

export type SupabaseReview = {
  id?: number;
  product_id: number;
  customer_name: string;
  rating: number;
  comment: string;
  created_at?: string;
};

/**
 * Fetch products from Supabase with safe fallback.
 * If the products table is empty or not yet created, returns null so the app uses local products.ts.
 */
export async function fetchProductsFromSupabase(): Promise<Product[] | null> {
  try {
    if (!supabaseUrl || !supabaseAnonKey) return null;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (error || !data || data.length === 0) {
      if (error && error.code !== "PGRST116" && error.code !== "42P01") {
        console.warn("Notice: Supabase products fetch returned:", error.message);
      }
      return null;
    }

    return data.map((item: any) => ({
      id: Number(item.id),
      name: item.name,
      price: Number(item.price),
      cat: (item.cat || item.category || "jewellery") as CategoryId,
      img: item.img || item.image || "/products/ring-0.jpg",
      images: Array.isArray(item.images)
        ? item.images
        : item.additional_images
        ? item.additional_images
        : [item.img || item.image || "/products/ring-0.jpg"],
      desc: item.desc || item.description || "",
      sizes: Array.isArray(item.sizes) ? item.sizes : undefined,
      material: item.material || "ستانلس ستيل مطلي ذهب",
      stock: (item.stock === "كمية محدودة" || item.stock === "low_stock" || (typeof item.stock === "number" && item.stock > 0 && item.stock <= 3))
        ? "كمية محدودة"
        : "متوفر",
      features: Array.isArray(item.features) ? item.features : [],
      featured: Boolean(item.featured),
    }));
  } catch (err) {
    console.warn("Notice: Exception while fetching Supabase products, using local fallback:", err);
    return null;
  }
}

/**
 * Fetch reviews from Supabase for a specific product.
 */
export async function fetchReviewsFromSupabase(productId: number): Promise<SupabaseReview[]> {
  try {
    if (!supabaseUrl || !supabaseAnonKey) return [];

    const { data, error } = await supabase
      .from("reviews")
      .select("id, product_id, customer_name, rating, comment, created_at")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.warn("Notice: Fetch reviews error:", error?.message);
      return [];
    }

    return data;
  } catch (err) {
    console.warn("Notice: Exception while fetching reviews:", err);
    return [];
  }
}

/**
 * Insert a review into Supabase reviews table.
 */
export async function insertReviewToSupabase(review: {
  product_id: number;
  customer_name: string;
  rating: number;
  comment: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return { success: false, error: "بيانات الاتصال بـ Supabase غير مهيأة" };
    }

    const { error } = await supabase.from("reviews").insert([
      {
        product_id: review.product_id,
        customer_name: review.customer_name.trim().slice(0, 100),
        rating: Math.min(Math.max(Number(review.rating), 1), 5),
        comment: review.comment.trim().slice(0, 500),
      },
    ]);

    if (error) {
      console.error("❌ فشل إرسال التقييم لـ Supabase:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("❌ استثناء أثناء إرسال التقييم:", err);
    return { success: false, error: err?.message || "فشل الاتصال بقاعدة البيانات" };
  }
}

/**
 * Insert an order into Supabase orders table with strict confirmation.
 * Returns { success: true, orderId } or { success: false, error }
 */
export async function insertOrderToSupabase(
  payload: SupabaseOrderPayload
): Promise<{ success: boolean; error?: string; orderId?: number | string }> {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return { success: false, error: "بيانات الاتصال بـ Supabase غير مهيأة في المتغيرات البيئية" };
    }

    // Insert order and request inserted row back to confirm insertion
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          customer_name: payload.customer_name,
          phone: payload.phone,
          governorate: payload.governorate,
          area: payload.area || null,
          address: payload.address,
          notes: payload.notes || null,
          items: payload.items,
          items_total: payload.items_total,
          shipping_estimate: payload.shipping_estimate ?? null,
          total: payload.items_total + (payload.shipping_estimate || 0),
          status: "pending",
        },
      ])
      .select("id")
      .single();

    if (error) {
      console.error("❌ فشل حفظ الطلب في Supabase:", error);
      return { success: false, error: error.message || "حدث خطأ أثناء حفظ الطلب" };
    }

    return { success: true, orderId: data?.id };
  } catch (err: any) {
    console.error("❌ استثناء غير متوقع أثناء حفظ الطلب:", err);
    return {
      success: false,
      error: err?.message || "فشل الاتصال بالسيرفر. يرجى التحقق من اتصالك بالإنترنت.",
    };
  }
}
