"use client";

import { useEffect } from "react";
import { translateText } from "./language-catalog";
import { useLanguage } from "./language-provider";
import type { Language } from "./language-provider";

const textState = new WeakMap<Text, { source: string; rendered: string }>();
const attributeState = new WeakMap<Element, Record<string, { source: string; rendered: string }>>();
const translatedAttributes = ["aria-label", "title", "placeholder"];

function updateText(node: Text, language: Language) {
  const parent = node.parentElement;
  if (parent?.closest('[lang="kn"]')) return;
  const current = node.nodeValue || "";
  const trimmed = current.trim();
  if (!trimmed) return;
  const state = textState.get(node);
  const source = state && trimmed === state.rendered ? state.source : state ? trimmed : translateTextToEnglish(trimmed);
  const translated = translateText(source, language);
  if (translated !== trimmed) {
    const start = current.indexOf(trimmed);
    node.nodeValue = `${current.slice(0, start)}${translated}${current.slice(start + trimmed.length)}`;
  }
  textState.set(node, { source, rendered: translated });
}

function updateAttribute(element: Element, name: string, language: Language) {
  if (element.closest('[lang="kn"]')) return;
  const current = element.getAttribute(name);
  if (!current?.trim()) return;
  const records = attributeState.get(element) || {};
  const state = records[name];
  const source = state && current === state.rendered ? state.source : state ? current : translateTextToEnglish(current);
  const translated = translateText(source, language);
  if (translated !== current) element.setAttribute(name, translated);
  records[name] = { source, rendered: translated };
  attributeState.set(element, records);
}

function translateTextToEnglish(value: string) {
  // The catalog is bidirectional, so English is the stable source for both modes.
  return translateText(value, "en");
}

function translateDocument(language: Language) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let current: Node | null = walker.nextNode();
  while (current) {
    const parent = current.parentElement;
    if (parent && !parent.closest("script,style,noscript")) nodes.push(current as Text);
    current = walker.nextNode();
  }
  nodes.forEach(node => updateText(node, language));
  document.querySelectorAll("[aria-label], [title], [placeholder]").forEach(element => translatedAttributes.forEach(name => updateAttribute(element, name, language)));
}

export function LanguageRuntime({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  useEffect(() => {
    document.documentElement.dataset.language = language;
    let scheduled = false;
    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      queueMicrotask(() => {
        scheduled = false;
        observer.disconnect();
        translateDocument(language);
        observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: translatedAttributes });
      });
    });
    translateDocument(language);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: translatedAttributes });
    return () => observer.disconnect();
  }, [language]);
  return <>{children}</>;
}
