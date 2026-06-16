"use client";

import { useEffect, useState } from "react";
import { TermsModal } from "@/components/layout/TermsModal";

const DECLINE_URL = "https://www.sonora.gob.mx";

export function TermsModalGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // El aviso reaparece en CADA carga/refresh: abrimos siempre al montar, sin
    // recordar aceptación previa (ya no se consulta ni se persiste en localStorage).
    // En SSR renderiza cerrado y abre tras hidratar (evita mismatch). Intencional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(true);
  }, []);

  const handleAccept = () => {
    // No se persiste la aceptación: el aviso vuelve a salir en el próximo refresh.
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
