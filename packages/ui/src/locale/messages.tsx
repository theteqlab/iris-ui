import { createContext, useContext, type ReactNode } from "react";

/** Texts that components render themselves. Every one can also be overridden by props. */
export interface Messages {
  /** Announced while a Button is loading. */
  loading: string;
  /** Textarea character counter. */
  characterCount: (count: number, max: number) => string;
  /** Select trigger when no value is chosen. */
  selectPlaceholder: string;
  /** Dialog close button. */
  close: string;
  /** Name of the toast region. */
  notifications: string;
  /** Close button of a toast. */
  closeNotification: string;
  /** PasswordToggleField button, password hidden. */
  showPassword: string;
  /** PasswordToggleField button, password shown. */
  hidePassword: string;
  /** Each box of a OneTimePasswordField. */
  codeCharacter: (index: number, length: number) => string;
  /** Map zoom buttons. */
  zoomIn: string;
  zoomOut: string;
}

export const en: Messages = {
  loading: "Loading",
  characterCount: (count, max) => `${count} / ${max} characters`,
  selectPlaceholder: "Select…",
  close: "Close",
  notifications: "Notifications",
  closeNotification: "Close notification",
  showPassword: "Show password",
  hidePassword: "Hide password",
  codeCharacter: (index, length) => `Character ${index} of ${length}`,
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
};

export const fr: Messages = {
  loading: "Chargement",
  characterCount: (count, max) => `${count} / ${max} caractères`,
  selectPlaceholder: "Choisir…",
  close: "Fermer",
  notifications: "Notifications",
  closeNotification: "Fermer la notification",
  showPassword: "Afficher le mot de passe",
  hidePassword: "Masquer le mot de passe",
  codeCharacter: (index, length) => `Caractère ${index} sur ${length}`,
  zoomIn: "Zoom avant",
  zoomOut: "Zoom arrière",
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
