import { afterEach, describe, expect, it, vi } from "vitest";
import { getStoredValue, setStoredValue } from "./storage";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("safe browser storage", () => {
  it("reads and writes available local storage", () => {
    const values = new Map<string, string>();

    vi.stubGlobal("window", {
      localStorage: {
        getItem: (key: string) => values.get(key) ?? null,
        setItem: (key: string, value: string) => values.set(key, value),
      },
    });

    expect(setStoredValue("theme", "dark")).toBe(true);
    expect(getStoredValue("theme")).toBe("dark");
  });

  it("falls back safely when local storage is unavailable", () => {
    vi.stubGlobal("window", {
      localStorage: {
        getItem: () => {
          throw new Error("Storage unavailable");
        },
        setItem: () => {
          throw new Error("Storage unavailable");
        },
      },
    });

    expect(getStoredValue("theme")).toBeNull();
    expect(setStoredValue("theme", "dark")).toBe(false);
  });
});
