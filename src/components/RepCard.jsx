import { Link } from "react-router-dom";

export default function RepCard({ id, full_name, industry, location, company }) {
  return (
    <div className="border rounded-xl p-5 shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{full_name}</h3>
      <p className="text-sm text-gray-600">{company}</p>

      <p className="mt-2 text-sm">
        {industry} • {location}
      </p>

      <Link
        to={`/rep/${id}`}
        className="inline-block mt-4 text-sm text-blue-600 hover:underline"
      >
        View Profile →
      </Link>
    </div>
  );
}