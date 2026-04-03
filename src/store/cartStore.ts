import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  tag: string;
  quantity: number;
  image: any;
};

type CartStore = {
  cart: CartItem[];

  addItem: (item: CartItem) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.cart.find((i) => i.id === item.id);

          // Para evita item duplicado
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }

          return { cart: [...state.cart, item] };
        }),

      increase: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decrease: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: Math.max(1, item.quantity - 1),
                }
              : item
          ),
        })),

      remove: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      clear: () => set({ cart: [] }),
    }),
    {
      name: "@xocolite:cart", // 👈 chave no AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);