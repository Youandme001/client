import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { catalogApi } from '../api';
import { SHIPPING_FEE } from '../utils/format';

const CART_KEY = 'glowy_cart';
const CartContext = createContext(null);

// Only ids and quantities are stored; names, prices and stock always come from the API
const readCart = () => {
  try {
    const items = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(items) ? items.filter((i) => i.productId && i.quantity > 0) : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);
  const [products, setProducts] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const refreshProducts = useCallback(
    () =>
      catalogApi
        .products()
        .then((list) => setProducts(Object.fromEntries(list.map((p) => [p.id, p]))))
        .catch(() => {}),
    []
  );

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const add = useCallback((product, quantity = 1) => {
    setProducts((prev) => ({ ...prev, [product.id]: product }));
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      const max = product.volume ?? 99;
      if (existing) {
        return prev.map((i) => (i.productId === product.id ? { ...i, quantity: Math.min(i.quantity + quantity, max) } : i));
      }
      return [...prev, { productId: product.id, quantity: Math.min(quantity, max) }];
    });
    setDrawerOpen(true);
  }, []);

  const setQuantity = useCallback((productId, quantity) => {
    setItems((prev) =>
      quantity <= 0 ? prev.filter((i) => i.productId !== productId) : prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  }, []);

  const remove = useCallback((productId) => setItems((prev) => prev.filter((i) => i.productId !== productId)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    // Lines whose product was removed from the catalogue are dropped
    const lines = items.filter((i) => products[i.productId]).map((i) => ({ ...i, product: products[i.productId] }));
    const subtotal = lines.reduce((s, l) => s + Number(l.product.price) * l.quantity, 0);
    const count = items.reduce((n, i) => n + i.quantity, 0);
    return {
      lines,
      count,
      subtotal,
      shipping: lines.length ? SHIPPING_FEE : 0,
      total: lines.length ? subtotal + SHIPPING_FEE : 0,
      loaded: Object.keys(products).length > 0,
      add,
      setQuantity,
      remove,
      clear,
      refreshProducts,
      drawerOpen,
      setDrawerOpen,
    };
  }, [items, products, add, setQuantity, remove, clear, refreshProducts, drawerOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
