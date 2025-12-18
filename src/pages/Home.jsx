import { Header, Footer } from "../components";

export default function Home() {
  return (
    <div>
      <Header />
      <main style={{ padding: 40, textAlign: "center" }}>
        <h1>Welcome to SalesRepPros</h1>
        <p>The #1 national directory for verified sales professionals.</p>
      </main>
      <Footer />
    </div>
  );
}