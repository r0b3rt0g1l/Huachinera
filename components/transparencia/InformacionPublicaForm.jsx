"use client";

import { useState } from "react";
import {
  Form,
  TextField,
  Label,
  Input,
  TextArea,
  FieldError,
  Radio,
  RadioGroup,
} from "react-aria-components";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { municipalConfig } from "@/lib/municipalConfig";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export function InformacionPublicaForm({ accessKey }) {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [modalidad, setModalidad] = useState("Correo electrónico");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", accessKey);
    formData.append(
      "subject",
      `Solicitud de Información Pública — Portal ${municipalConfig.identidad.nombreCorto}`,
    );
    formData.append(
      "from_name",
      `Portal ${municipalConfig.identidad.nombreCorto} · Información Pública`,
    );
    formData.append("modalidad_entrega", modalidad);

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        e.currentTarget.reset();
        setModalidad("Correo electrónico");
      } else {
        throw new Error(json.message || "No se pudo enviar la solicitud.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Ocurrió un error inesperado.");
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-guinda)] focus:ring-2 focus:ring-[var(--color-guinda)]/20 data-[invalid]:border-red-500";

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)] md:p-8">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-12 text-center text-emerald-800"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle className="h-8 w-8" aria-hidden="true" />
            </span>
            <h3 className="font-display text-2xl font-bold text-emerald-900">
              Tu mensaje fue enviado exitosamente
            </h3>
            <p className="max-w-md text-sm text-emerald-800/85">
              La Unidad de Transparencia Municipal recibió tu solicitud y dará
              seguimiento dentro de los plazos establecidos por la Ley General
              de Transparencia.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-2 rounded-full border border-emerald-300 bg-white px-5 py-2 text-sm font-semibold text-emerald-800 hover:border-emerald-500"
            >
              Hacer otra solicitud
            </button>
          </motion.div>
        ) : (
          <Form
            key="form"
            onSubmit={onSubmit}
            validationBehavior="native"
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <TextField name="nombre" isRequired>
                <Label className="text-sm font-semibold text-[var(--color-text)]">
                  Nombre completo *
                </Label>
                <Input className={cn("mt-2", inputClasses)} placeholder="Tu nombre" />
                <FieldError className="mt-1 text-xs text-red-600" />
              </TextField>

              <TextField name="email" type="email" isRequired>
                <Label className="text-sm font-semibold text-[var(--color-text)]">
                  Correo electrónico *
                </Label>
                <Input
                  className={cn("mt-2", inputClasses)}
                  placeholder="tu@correo.com"
                />
                <FieldError className="mt-1 text-xs text-red-600" />
              </TextField>

              <TextField name="telefono" type="tel">
                <Label className="text-sm font-semibold text-[var(--color-text)]">
                  Teléfono
                </Label>
                <Input
                  className={cn("mt-2", inputClasses)}
                  placeholder="(opcional)"
                  inputMode="tel"
                />
              </TextField>

              <TextField name="localidad">
                <Label className="text-sm font-semibold text-[var(--color-text)]">
                  Localidad
                </Label>
                <Input
                  className={cn("mt-2", inputClasses)}
                  placeholder="Centro, localidad o colonia"
                />
              </TextField>
            </div>

            <TextField name="descripcion" isRequired>
              <Label className="text-sm font-semibold text-[var(--color-text)]">
                Descripción de la información solicitada *
              </Label>
              <TextArea
                rows={5}
                className={cn(
                  "mt-2 resize-y",
                  inputClasses,
                )}
                placeholder="Describe con la mayor claridad posible la información que requieres."
              />
              <FieldError className="mt-1 text-xs text-red-600" />
            </TextField>

            <RadioGroup
              name="modalidad"
              value={modalidad}
              onChange={setModalidad}
              isRequired
              className="flex flex-col gap-2"
            >
              <Label className="text-sm font-semibold text-[var(--color-text)]">
                Modalidad preferida de entrega *
              </Label>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  "Correo electrónico",
                  "Recoger en oficina",
                  "Consulta directa",
                ].map((opt) => (
                  <Radio
                    key={opt}
                    value={opt}
                    className={({ isSelected }) =>
                      cn(
                        "cursor-pointer rounded-lg border px-4 py-3 text-sm font-medium transition outline-none",
                        isSelected
                          ? "border-[var(--color-guinda)] bg-[var(--color-guinda)]/5 text-[var(--color-guinda)]"
                          : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-guinda)]/40",
                      )
                    }
                  >
                    {opt}
                  </Radio>
                ))}
              </div>
            </RadioGroup>

            <AnimatePresence>
              {status === "error" && (
                <motion.div
                  key="error"
                  role="alert"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  <AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    Hubo un problema. Intenta de nuevo o contacta directamente
                    al municipio.
                    {errorMsg ? (
                      <span className="mt-1 block text-xs text-red-600/80">
                        Detalle técnico: {errorMsg}
                      </span>
                    ) : null}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[var(--color-text-muted)]">
                Al enviar tu solicitud aceptas el aviso de privacidad del
                portal institucional.
              </p>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-guinda)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-guinda-deep)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Enviar solicitud
                  </>
                )}
              </button>
            </div>
          </Form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default InformacionPublicaForm;
