"use client";

import { useSyncExternalStore } from "react";

const SESSION_KEY = "suncart.session";
const USERS_KEY = "suncart.users";
const AUTH_EVENT = "suncart-auth-change";
let cachedSessionRaw;
let cachedSession;

const getStoredJson = (key, fallback) => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const setStoredJson = (key, value) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(AUTH_EVENT));
};

const clearStoredJson = (key) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(key);
  window.dispatchEvent(new Event(AUTH_EVENT));
};

const getSessionSnapshot = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(SESSION_KEY);

  if (raw === cachedSessionRaw) {
    return cachedSession;
  }

  cachedSessionRaw = raw;
  cachedSession = raw ? JSON.parse(raw) : null;

  return cachedSession;
};

const subscribe = (callback) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener(AUTH_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(AUTH_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};

export function useSession() {
  const session = useSyncExternalStore(subscribe, getSessionSnapshot, () => null);

  return {
    data: session,
    isPending: false,
  };
}

export const signIn = {
  email: async ({ email, password }) => {
    const users = getStoredJson(USERS_KEY, []);
    const user = users.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password,
    );

    if (!user) {
      return { error: { message: "Invalid email or password." } };
    }

    const session = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
    };

    setStoredJson(SESSION_KEY, session);
    return { data: session, error: null };
  },

  social: async ({ provider, callbackURL = "/" }) => {
    const session = {
      user: {
        id: `${provider}-demo-user`,
        name: "Sunny Shopper",
        email: "sunny@suncart.shop",
        image: "",
      },
    };

    setStoredJson(SESSION_KEY, session);

    if (typeof window !== "undefined") {
      window.location.assign(callbackURL);
    }

    return { data: session, error: null };
  },
};

export const signUp = {
  email: async ({ email, password, name, image }) => {
    const users = getStoredJson(USERS_KEY, []);
    const exists = users.some(
      (item) => item.email.toLowerCase() === email.toLowerCase(),
    );

    if (exists) {
      return { error: { message: "An account with this email already exists." } };
    }

    const user = {
      id:
        globalThis.crypto?.randomUUID?.() ||
        `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name,
      email,
      image: image || "",
      password,
    };

    setStoredJson(USERS_KEY, [...users, user]);
    return { data: { user }, error: null };
  },
};

export async function signOut() {
  clearStoredJson(SESSION_KEY);
  return undefined;
}

export async function getSession() {
  return getSessionSnapshot();
}

export async function updateUser(updates) {
  const session = getSessionSnapshot();

  if (!session?.user) {
    return { error: { message: "No active session." } };
  }

  const nextSession = {
    ...session,
    user: {
      ...session.user,
      ...updates,
    },
  };

  setStoredJson(SESSION_KEY, nextSession);
  return { data: nextSession, error: null };
}

export const authClient = {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
  updateUser,
};
