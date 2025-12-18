import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // ------------------------------
  // Load authentication session
  // ------------------------------
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // ------------------------------
  // Load rep profile + leads
  // ------------------------------
  useEffect(() => {
    if (!session?.user?.id) return;

    const loadData = async () => {
      const userId = session.user.id;

      // Load profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      setProfile(profileData);

      // Load leads for this rep
      const { data: leadData, error: leadsError } = await supabase
        .from("leads")
        .select("*")
        .eq("rep_id", userId)
        .order("created_at", { ascending: false });

      if (leadsError) {
        console.error("Error loading leads:", leadsError);
      } else {
        setLeads(leadData);
      }

      setLoading(false);
    };

    loadData();
  }, [session]);

  // ------------------------------
  // Loading state
  // ------------------------------
  if (loading) {
    return (
      <>
        <Header />
        <div className="text-center py-20 text-xl">Loading dashboard...</div>
        <Footer />
      </>
    );
  }

  // ------------------------------
  // Not logged in
  // ------------------------------
  if (!session) {
    return (
      <>
        <Header />
        <div className="text-center py-20 text-xl text-red-600">
          You must be logged in to view your dashboard.
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

        {/* Profile Summary */}
        <div className="bg-white p-6 shadow rounded-xl mb-10">
          <h2 className="text-2xl font-semibold mb-2">Your Profile</h2>
          {profile ? (
            <div className="text-gray-700">
              <p>
                <strong>Name:</strong> {profile.full_name}
              </p>
              <p>
                <strong>Industry:</strong> {profile.industry}
              </p>
              <p>
                <strong>Company:</strong> {profile.company}
              </p>
              <p>
                <strong>Location:</strong> {profile.location}
              </p>
            </div>
          ) : (
            <p>No profile found.</p>
          )}
        </div>

        {/* Leads Section */}
        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Your Leads</h2>

          {leads.length === 0 ? (
            <p className="text-gray-500">You have not received any leads yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 border">Name</th>
                    <th className="p-3 border">Email</th>
                    <th className="p-3 border">Phone</th>
                    <th className="p-3 border">Message</th>
                    <th className="p-3 border">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="p-3 border">{lead.name}</td>
                      <td className="p-3 border">{lead.email}</td>
                      <td className="p-3 border">{lead.phone || "-"}</td>
                      <td className="p-3 border text-sm">{lead.message}</td>
                      <td className="p-3 border">
                        {new Date(lead.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
