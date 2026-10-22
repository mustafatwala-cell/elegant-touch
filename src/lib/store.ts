import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export type CartLine = {
  key: string;
  productId: number;
  name: string;
  price: number;
  img: string;
  size: string | null;
  qty: number;
};

export type Review = {
  name: string;
  rating: number;
  comment: string;
  at: number;
};

type ShopState = {
  cart: CartLine[];
  favorites: number[];
  reviews: Record<string, Review[]>;
  cartOpen: boolean;
  checkoutOpen: boolean;
  menuOpen: boolean;
  activeCat: "all" | "jewellery" | "bags" | "accessories" | "gifts";
  setCartOpen: (v: boolean) => void;
  setCheckoutOpen: (v: boolean) => void;
  setMenuOpen: (v: boolean) => void;
  setActiveCat: (c: ShopState["activeCat"]) => void;
  addToCart: (product: Product, qty: number, size: string | null) => void;
  changeQty: (key: string, delta: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  toggleFavorite: (id: number) => void;
  addReview: (productId: number, review: Omit<Review, "at">) => void;
  cartCount: () => number;
  cartTotal: () => number;
};

function lineKey(productId: number, size: string | null) {
  return `${productId}::${size ?? ""}`;
}

export const useShop = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      favorites: [],
      reviews: {},
      cartOpen: false,
      checkoutOpen: false,
      menuOpen: false,
      activeCat: "all",
      setCartOpen: (cartOpen) => set({ cartOpen, menuOpen: false }),
      setCheckoutOpen: (checkoutOpen) => set({ checkoutOpen }),
      setMenuOpen: (menuOpen) => set({ menuOpen }),
      setActiveCat: (activeCat) => set({ activeCat, menuOpen: false }),
      addToCart: (product, qty, size) => {
        // التحقق من حالة المخزون
        const isOutOfStock =
          (product as any).stock === "غير متوفر" ||
          (product as any).stock === "نفذت الكمية" ||
          (product as any).stock === "out_of_stock" ||
          (product as any).stock === 0;

        if (isOutOfStock) {
          return;
        }

        const key = lineKey(product.id, size);
        const cart = [...get().cart];
        const existing = cart.find((l) => l.key === key);
        const MAX_PER_ITEM = 20;

        if (existing) {
          existing.qty = Math.min(existing.qty + qty, MAX_PER_ITEM);
        } else {
          cart.push({
            key,
            productId: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            size,
            qty: Math.min(Math.max(qty, 1), MAX_PER_ITEM),
          });
        }
        set({ cart });
      },
      changeQty: (key, delta) => {
        const MAX_PER_ITEM = 20;
        const cart = get()
          .cart.map((l) => {
            if (l.key === key) {
              const newQty = Math.min(l.qty + delta, MAX_PER_ITEM);
              return { ...l, qty: newQty };
            }
            return l;
          })
          .filter((l) => l.qty > 0);
        set({ cart });
      },
      removeFromCart: (key) => set({ cart: get().cart.filter((l) => l.key !== key) }),
      clearCart: () => set({ cart: [] }),
      toggleFavorite: (id) => {
        const favorites = get().favorites.includes(id)
          ? get().favorites.filter((x) => x !== id)
          : [...get().favorites, id];
        set({ favorites });
      },
      addReview: (productId, review) => {
        const id = String(productId);
        const current = get().reviews[id] ?? [];
        set({
          reviews: {
            ...get().reviews,
            [id]: [{ ...review, at: Date.now() }, ...current],
          },
        });
      },
      cartCount: () => get().cart.reduce((s, l) => s + l.qty, 0),
      cartTotal: () => get().cart.reduce((s, l) => s + l.price * l.qty, 0),
    }),
    {
      name: "et-shop",
      partialize: (s) => ({
        cart: s.cart,
        favorites: s.favorites,
        reviews: s.reviews,
      }),
    },
  ),
);
