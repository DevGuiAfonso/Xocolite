// contexts/cartContext.tsx
import { createContext, useContext, useState } from "react";

type Item = {
  id: string;
  name: string;
  price: number;
};

type CartContextType = {
  items: Item[];
  addItem: (item: Item) => void;
};

const CartContext = createContext({} as CartContextType);

export function CartProvider({ children }: any) {
  const [items, setItems] = useState<Item[]>([]);

  function addItem(item: Item) {
    setItems((prev) => [...prev, item]);
  }

  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}