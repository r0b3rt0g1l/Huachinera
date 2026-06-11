"use client";

import { useEffect, useState } from "react";

/**
 * Devuelve true si el usuario prefiere movimiento reducido del sistema.
 * Reactivo a cambios en tiempo real.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);

    const handler = (e) => setReduced(e.matches);
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, []);

  return reduced;
}

export default useReducedMotion;
