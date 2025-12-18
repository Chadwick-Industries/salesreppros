import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RepProfile() {
  const { id } = useParams();

  const [rep, setRep] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lead form state
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // ----------------------------------
  // Load rep data
  // ----------------------------------
  useEffect(() => {
    const loadRep = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error loading rep:", error);
      } else {
        setRep(data);
      }

      setLoading(false);
    };

    loadRep();
  }, [id]);

  // ----------------------------------
  // Submit Lead
  // ----------------------------------
  const submitLead = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("leads").insert({
      rep_id: rep.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: lead.message,
    });

    if (error) {
      alert("Error submitting lead.");
      console.error(error);
      return;
    }

    setSubmitted(true);
    setLead({ name: "", email: "", phone: "", message: "" });
  };

  // ----------------------------------
  // Page Loading UI
  // ----------------------------------
  if (loading) {
    return (
      <>
        <Header />
        <div className="text-center py-20 text-xl">Loading profile...</div>
      </>
    );
  }

  // Rep not found
  if (!rep) {
    return (
      <>
        <Header />
        <div className="text-center py-20 text-xl text-red-600">
          Rep not found.
        </div>
        <Footer />
      </>
    );
  }

  // ----------------------------------
  // MAIN PAGE UI
  // ----------------------------------
  return (
    <>
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Back Button */}
        <Link
          to="/directory"
          className="inline-block mb-6 px-5 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
        >
          ← Back to Directory
        </Link>

        {/* Profile Header */}
        <div className="bg-white shadow p-8 rounded-xl flex items-center gap-8 mb-10">
          <img
            src={
              rep.photo_url ||
              "https://via.placeholder.com/150?text=No+Photo"
            }
            className="w-40 h-40 rounded-xl object-cover border"
            alt={rep.full_name}
          />

          <div>
            <h1 className="text-4xl font-bold mb-2">{rep.full_name}</h1>
            <p className="text-xl text-gray-700">{rep.industry}</p>
            <p className="text-gray-600">{rep.location}</p>
            <p className="text-gray-600">{rep.company}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white shadow p-6 rounded-xl mb-10">
          <h2 className="text-2xl font-semibold mb-3">About {rep.full_name}</h2>
          <p className="text-gray-700 leading-relaxed">
            {rep.bio || "This rep has not added a bio yet."}
          </p>
        </div>

        {/* Lead Capture Form */}
        <div className="bg-white shadow p-6 rounded-xl mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Contact {rep.full_name}
          </h2>

          {submitted ? (
            <p className="text-green-600 font-semibold text-lg">
              ✅ Your message has been sent! The rep will contact you soon.
            </p>
          ) : (
            <form onSubmit={submitLead} className="space-y-4 max-w-xl">

              <input
                className="w-full p-3 border rounded-xl"
                placeholder="Your Name"
                required
                value={lead.name}
                onChange={(e) => setLead({ ...lead, name: e.target.value })}
              />

              <input
                className="w-full p-3 border rounded-xl"
                placeholder="Your Email"
                type="email"
                required
                value={lead.email}
                onChange={(e) => setLead({ ...lead, email: e.target.value })}
              />

              <input
                className="w-full p-3 border rounded-xl"
                placeholder="Your Phone (optional)"
                value={lead.phone}
                onChange={(e) => setLead({ ...lead, phone: e.target.value })}
              />

              <textarea
                className="w-full p-3 border rounded-xl h-32"
                placeholder="Tell the rep about your project..."
                required
                value={lead.message}
                onChange={(e) => setLead({ ...lead, message: e.target.value })}
              />

              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}