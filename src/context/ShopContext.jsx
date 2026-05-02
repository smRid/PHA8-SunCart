"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

const CART_KEY = "suncart.cart";
const WISHLIST_KEY = "suncart.wishlist";
const SHOP_EVENT = "suncart-shop-change";
const ShopContext = createContext(null);
const EMPTY_ITEMS = [];
const snapshots = new Map();

const parseStoredJson = (raw, fallback) => {
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const getStoredJson = (key, fallback = EMPTY_ITEMS) => {
  if (typeof window === "undefined") {
    return fallback;
  }

  const raw = window.localStorage.getItem(key) || "";
  const cached = snapshots.get(key);

  if (cached?.raw === raw) {
    return cached.value;
  }

  const value = parseStoredJson(raw, fallback);
  snapshots.set(key, { raw, value });

  return value;
};

const setStoredJson = (key, value) => {
  if (typeof window === "undefined") {
    return;
  }

  const raw = JSON.stringify(value);

  snapshots.set(key, { raw, value });
  window.localStorage.setItem(key, raw);
  window.dispatchEvent(new Event(SHOP_EVENT));
};

const subscribe = (callback) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener(SHOP_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(SHOP_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};

const getServerSnapshot = () => EMPTY_ITEMS;

export function ShopProvider({ children }) {
  const cart = useSyncExternalStore(
    subscribe,
    () => getStoredJson(CART_KEY),
    getServerSnapshot,
  );
  const wishlist = useSyncExternalStore(
    subscribe,
    () => getStoredJson(WISHLIST_KEY),
    getServerSnapshot,
  );

  const addToCart = useCallback((product, quantity = 1) => {
    const items = getStoredJson(CART_KEY);
    const existing = items.find((item) => item.id === product.id);
    const nextItems = existing
      ? items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      : [...items, { ...product, quantity }];

    setStoredJson(CART_KEY, nextItems);
  }, []);

  const isWishlisted = useCallback(
    (id) => wishlist.some((item) => item.id === id),
    [wishlist],
  );

  const toggleWishlist = useCallback((product) => {
    const items = getStoredJson(WISHLIST_KEY);
    const nextItems = items.some((item) => item.id === product.id)
      ? items.filter((item) => item.id !== product.id)
      : [...items, product];

    setStoredJson(WISHLIST_KEY, nextItems);
  }, []);

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      addToCart,
      isWishlisted,
      toggleWishlist,
    }),
    [addToCart, cart, isWishlisted, toggleWishlist, wishlist],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used within ShopProvider.");
  }

  return context;
}
