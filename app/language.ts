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

type ScrollSnapshot = {
  anchor: HTMLElement | null;
  anchorTop: number;
  scrollY: number;
};

function captureScrollSnapshot(): ScrollSnapshot | null {
  if (typeof window === "undefined" || window.scrollY <= 0) return null;

  const viewportAnchor = Math.min(window.innerHeight * 0.35, 260);
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>("section, article, h1, h2, h3, p"),
  );
  const visibleCandidates = candidates
    .map((element) => ({ element, rect: element.getBoundingClientRect() }))
    .filter(({ rect }) => rect.top <= viewportAnchor && rect.bottom >= viewportAnchor)
    .sort((a, b) => Math.abs(a.rect.top - viewportAnchor) - Math.abs(b.rect.top - viewportAnchor));
  const fallback = candidates
    .map((element) => ({ element, rect: element.getBoundingClientRect() }))
    .filter(({ rect }) => rect.top > viewportAnchor)
    .sort((a, b) => a.rect.top - b.rect.top)[0];
  const anchor = visibleCandidates[0] ?? fallback;

  return {
    anchor: anchor?.element ?? null,
    anchorTop: anchor?.rect.top ?? 0,
    scrollY: window.scrollY,
  };
}

function preserveScrollPosition(snapshot: ScrollSnapshot | null) {
  if (typeof window === "undefined") return;

  const root = document.documentElement;
  const previousOverflowAnchor = root.style.overflowAnchor;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.overflowAnchor = "none";
  root.style.scrollBehavior = "auto";

  const restore = () => {
    if (!snapshot) return;

    const anchorDelta = snapshot.anchor && document.contains(snapshot.anchor)
      ? snapshot.anchor.getBoundingClientRect().top - snapshot.anchorTop
      : 0;

    window.scrollTo({
      top: Math.max(0, snapshot.scrollY + anchorDelta),
      left: window.scrollX,
      behavior: "auto",
    });
  };

  window.requestAnimationFrame(() => {
    restore();
    window.requestAnimationFrame(() => {
      restore();
      root.style.overflowAnchor = previousOverflowAnchor;
      root.style.scrollBehavior = previousScrollBehavior;
    });
  });
}

export function useLanguage() {
  const language = useSyncExternalStore<Language>(subscribeToLanguage, getStoredLanguage, () => "en");
  const setLanguage = useCallback<Dispatch<SetStateAction<Language>>>((nextLanguage) => {
    const next = typeof nextLanguage === "function" ? nextLanguage(getStoredLanguage()) : nextLanguage;
    const scrollSnapshot = captureScrollSnapshot();
    try {
      window.localStorage.setItem(languageStorageKey, next);
      window.dispatchEvent(new Event(languageEventName));
    } catch {
      // Keep the in-memory preference working when storage is unavailable.
    }
    preserveScrollPosition(scrollSnapshot);
  }, []);

  return [language, setLanguage] as const;
}
