"use client";

import { useEffect, useState } from "react";
import { TermsModal } from "@/components/layout/TermsModal";

const STORAGE_KEY = "gob_terms_accepted_v1";
const DECLINE_URL = "https://www.sonora.gob.mx";

export function TermsModalGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const accepted = window.localStorage.getItem(STORAGE_KEY);
      if (!accepted) setOpen(true);
    } catch {
      setOpen(true);
    }
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
