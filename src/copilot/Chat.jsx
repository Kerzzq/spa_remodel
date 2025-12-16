/**
 * Chat.jsx
 *
 * Replica fiel del chat embebido del proyecto original (ZIP):
 * - iframe fijo
 * - URL completa hardcoded
 * - siempre montado
 * - sin lógica condicional
 * - sin variables de entorno
 *
 * Si en el futuro migras a Azure Bot / Direct Line,
 * este será el ÚNICO archivo que tendrás que cambiar.
 */

export default function Chat() {
  // ⚠️ PON AQUÍ LA MISMA URL QUE USABA EL ZIP ORIGINAL
  // (la de Copilot Studio embebido)
  const COPILOT_IFRAME_URL =
    "https://copilotstudio.microsoft.com/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#fff"
      }}
    >
      {/* Header opcional (si el original no tenía, puedes quitarlo) */}
      <div
        style={{
          padding: "10px 12px",
          borderBottom: "1px solid #eee",
          fontWeight: 600,
          fontSize: 14
        }}
      >
        Copilot
      </div>

      {/* Iframe del agente */}
      <iframe
        src={COPILOT_IFRAME_URL}
        title="Copilot Agent"
        allow="microphone; clipboard-read; clipboard-write"
        style={{
          flex: 1,
          width: "100%",
          border: "none"
        }}
      />
    </div>
  );
}
