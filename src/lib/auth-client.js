"use client";

export function useSession() {
  return {
    data: null,
    isPending: false,
  };
}

export async function signOut() {
  return undefined;
}
