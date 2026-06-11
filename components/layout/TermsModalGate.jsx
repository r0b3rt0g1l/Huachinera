"use client";

import { useEffect, useState } from "react";
import { TermsModal } from "@/components/layout/TermsModal";

const STORAGE_KEY = "gob_terms_accepted_v1";
const DECLINE_URL = "https://www.sonora.gob.mx";

export function TermsModalGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let shouldOpen = true;
    try {
      shouldOpen = !window.localStorage.getItem(STORAGE_KEY);
    } catch {
      shouldOpen = true;
    }
    // Gate client-only: localStorage no existe en SSR; el modal de términos debe
    // abrir TRAS hidratar para no provocar mismatch. Es intencional, no un bug.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(shouldOpen);
  }, []);

  const handleAccept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {
      // localStorage no disponible (modo privado, etc.) — cerrar igual.
    }
    setOpen(false);
  };

  const handleDecline = () => {
    window.location.href = DECLINE_URL;
  };

  return (
    <TermsModal
      open={open}
      onAccept={handleAccept}
      onDecline={handleDecline}
    />
  );
}

export default TermsModalGate;
