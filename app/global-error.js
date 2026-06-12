"use client";

// Último recurso: se activa solo si falla el propio root layout. Reemplaza TODO
// el documento, por eso renderiza su propio <html>/<body> con estilos inline
// (globals.css podría no estar cargado). Paleta provisional de Huachinera.
export default function GlobalError({ reset }) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#064E3B",
          color: "#ffffff",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "32rem" }}>
          <p
            style={{
              fontSize: "0.78rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#06B6D4",
              margin: 0,
            }}
          >
            Error
          </p>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              lineHeight: 1.2,
              margin: "1rem 0",
            }}
          >
            Ocurrió un problema inesperado
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1.05rem",
              margin: "0 0 1.75rem",
            }}
          >
            Estamos trabajando para resolverlo. Intenta recargar la página o
            vuelve en un momento.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: "#06B6D4",
              color: "#064E3B",
              border: "none",
              borderRadius: "9999px",
              padding: "0.85rem 1.9rem",
              fontSize: "0.92rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
