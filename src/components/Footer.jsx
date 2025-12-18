export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-16 py-6">
      <div className="max-w-6xl mx-auto text-center text-sm text-gray-600">
        © {new Date().getFullYear()} SalesRepPros — All Rights Reserved
      </div>
    </footer>
  );
}