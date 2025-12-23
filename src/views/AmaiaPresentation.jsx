export default function AmaiaPresentation() {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "40px 20px",
        color: "white"
      }}
    >
      {/* =========================
          CABECERA
          ========================= */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: 12
          }}
        >
          AMAIA
        </h1>

        <p
          style={{
            fontSize: 18,
            opacity: 0.85,
            maxWidth: 720
          }}
        >
          Presentación de AMAIA y su propuesta de valor dentro
          del ecosistema de soluciones de IA generativa.
        </p>
      </div>

      {/* =========================
          CONTENEDOR DE VÍDEO
          ========================= */}
      <div
        style={{
          background: "rgba(255,255,255,0.06)",
          borderRadius: 24,
          padding: 20,
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)"
        }}
      >
        <div
          style={{
            position: "relative",
            paddingTop: "56.25%", // 16:9
            borderRadius: 18,
            overflow: "hidden",
            background: "black"
          }}
        >
          <video
            controls
            preload="metadata"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%"
            }}
          >
            <source
              src="/statics/videos/presentacion-amaia-v1.mp4"
              type="video/mp4"
            />
            Tu navegador no soporta reproducción de vídeo.
          </video>
        </div>
      </div>
    </div>
  );
}
