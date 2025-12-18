import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Directory() {
  const [reps, setReps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  // Load Reps from Supabase
  const loadProfiles = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading profiles:", error);
    } else {
      setReps(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  // FILTER LOGIC
  const filteredReps = reps.filter((rep) => {
    const matchesSearch =
      rep.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.industry?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry =
      industryFilter === "All" || rep.industry === industryFilter;

    const matchesLocation =
      locationFilter === "All" || rep.location === locationFilter;

    return matchesSearch && matchesIndustry && matchesLocation;
  });

  // Get unique industries & locations for dropdowns
  const industries = ["All", ...new Set(reps.map((r) => r.industry))];
  const locations = ["All", ...new Set(reps.map((r) => r.location))];

  return (
    <div>
      <Header />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">Sales Rep Directory</h1>
        <p className="text-gray-600 mb-6">Browse verified sales professionals across the U.S.</p>

        {/* Search + Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name, company, or industry..."
            className="border p-3 rounded-xl w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Industry Filter */}
          <select
            className="border p-3 rounded-xl"
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>

          {/* Location Filter */}
          <select
            className="border p-3 rounded-xl"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {loading && <p className="text-gray-500 text-center">Loading reps…</p>}

        {/* No Results */}
        {!loading && filteredReps.length === 0 && (
          <div className="text-center text-gray-600 py-10">
            <p>No reps match your filters.</p>
          </div>
        )}

        {/* Reps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredReps.map((rep) => (
            <Link
              key={rep.id}
              to={`/rep/${rep.id}`}
              className="border p-5 rounded-xl shadow hover:shadow-md transition bg-white"
            >
              <h2 className="text-xl font-bold">{rep.full_name}</h2>
              <p className="text-gray-600">{rep.company}</p>
              <p className="mt-2">
                <span className="font-semibold">{rep.industry}</span> • {rep.location}
              </p>
              <p className="mt-3 text-blue-600 font-semibold">View Profile →</p>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}