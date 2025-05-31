"use client";

import { useEffect } from "react";

export function HydrationWarningSupressor() {
  useEffect(() => {
    // Suprimir warnings de hydration causados por extensões do browser
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("hydrat") &&
        (args[0].includes("cz-shortcut-listen") ||
          args[0].includes("browser extension"))
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return null;
}
