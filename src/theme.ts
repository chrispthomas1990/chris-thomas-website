import { getStoredValue } from "./storage";

export type ThemeMode = "light" | "dark";

export const themeStorageKey = "preferred-theme";

export const themeColors = {
  dark: "#101010",
  light: "#f3f0e8",
  darkMenu: "#c7ff38",
} as const;

export function isThemeMode(value: string | null): value is ThemeMode {
  return value === "light" || value === "dark";
}

export function getInitialThemeMode(): ThemeMode {
  const savedTheme = getStoredValue(themeStorageKey);

  if (isThemeMode(savedTheme)) {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getThemeColor(themeMode: ThemeMode, isMenuOpen: boolean) {
  if (themeMode === "dark" && isMenuOpen) {
    return themeColors.darkMenu;
  }

  if (themeMode === "dark" || isMenuOpen) {
    return themeColors.dark;
  }

  return themeColors.light;
}
