export default function Footer() {
  return (
    <footer
      style={{
        padding: "24px 32px",
        borderTop: "1px solid rgba(255,255,255,0.15)",
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        gap: 12,
        color: "rgba(255,255,255,0.75)",
        fontSize: 13
      }}
    >
      <span>Powered by</span>

    {/* Logo Inetum */}
      <div className="inetumLogo">
        <span className="inetumWord">inetum</span>

        <span className="inetumMark">
          <span className="inetumSquare ad" />
          <span className="inetumSquare am" />
          <span className="inetumSquare md" />
          <span className="inetumSquare ii" />
        </span>
      </div>
    </footer>
  );
}
