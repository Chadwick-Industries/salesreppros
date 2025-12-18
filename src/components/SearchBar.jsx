export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by name, industry, or location..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-xl p-3 mb-6"
    />
  );
}