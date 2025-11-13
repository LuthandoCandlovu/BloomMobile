export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9fafb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#111" }}>🌸 Welcome to Bloom</h1>
      <p style={{ fontSize: "1.2rem", color: "#555" }}>
        This is your first Next.js page. You can edit it freely!
      </p>
    </main>
  );
}
