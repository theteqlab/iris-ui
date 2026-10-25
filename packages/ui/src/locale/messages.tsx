import { createContext, useContext, type ReactNode } from "react";

/** Texts that components render themselves. Every one can also be overridden by props. */
export interface Messages {
  /** Announced while a Button is loading. */
  loading: string;
  /** Textarea character counter. */
  characterCount: (count: number, max: number) => string;
  /** Select trigger when no value is chosen. */
  selectPlaceholder: string;
}

export const en: Messages = {
  loading: "Loading",
  characterCount: (count, max) => `${count} / ${max} characters`,
  selectPlaceholder: "Select…",
};

export const fr: Messages = {
  loading: "Chargement",
  characterCount: (count, max) => `${count} / ${max} caractères`,
  selectPlaceholder: "Choisir…",
};

const MessagesContext = createContext<Messages>(en);

export interface LocaleProviderProps {
  /** `en`, `fr`, or your own `Messages` object. Defaults to `en`. */
  messages: Messages;
  children?: ReactNode;
}

/** Optional. Sets the texts used by every component below it. */
export function LocaleProvider({ messages, children }: LocaleProviderProps) {
  return <MessagesContext.Provider value={messages}>{children}</MessagesContext.Provider>;
}

export function useMessages(): Messages {
  return useContext(MessagesContext);
}
