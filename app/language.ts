"use client";

import { useCallback, useSyncExternalStore, type Dispatch, type SetStateAction } from "react";

export type Language = "en" | "fr";

const languageStorageKey = "ayphil-language";
const languageEventName = "ayphil-language-change";

function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";

  try {
    const storedLanguage = window.localStorage.getItem(languageStorageKey);
    return storedLanguage === "fr" ? "fr" : "en";
  } catch {
    return "en";
  }
}

function subscribeToLanguage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(languageEventName, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(languageEventName, callback);
  };
}

export function useLanguage() {
  const language = useSyncExternalStore(subscribeToLanguage, getStoredLanguage, () => "en");
  const setLanguage = useCallback<Dispatch<SetStateAction<Language>>>((nextLanguage) => {
    const next = typeof nextLanguage === "function" ? nextLanguage(getStoredLanguage()) : nextLanguage;
    try {
      window.localStorage.setItem(languageStorageKey, next);
      window.dispatchEvent(new Event(languageEventName));
    } catch {
      // Keep the in-memory preference working when storage is unavailable.
    }
  }, []);

  return [language, setLanguage] as const;
}
