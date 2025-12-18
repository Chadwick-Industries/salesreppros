import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-black text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          SalesRepPros
        </Link>

        <nav className="space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/directory" className="hover:underline">Directory</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/auth" className="hover:underline">Login</Link>
        </nav>
      </div>
    </header>
  );
}