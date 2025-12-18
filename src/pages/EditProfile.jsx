import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const [form, setForm] = useState({
    full_name: "",
    company: "",
    industry: "",
    city: "",
    state: "",
    bio: "",
    website: "",
    experience_years: "",
    services: "",
    photo_url: "",
  });

  // Load user + profile
  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/auth");
        return;
      }

      setUserId(session.user.id);

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (data) {
        setForm({
          ...data,
          services: data.services?.join(", ") || "",
        });
      }

      setLoading(false);
    };

    loadProfile();
  }, [navigate]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle photo upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !userId) return;

    const filePath = `${userId}.jpg`;

    const { error } = await supabase.storage
      .from("rep-photos")
      .upload(filePath, file, { upsert: true });

    if (error) {
      alert("Error uploading image");
      return;
    }

    const { data } = supabase.storage
      .from("rep-photos")
      .getPublicUrl(filePath);

    setForm({ ...form, photo_url: data.publicUrl });
  };

  // Save profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updates = {
      ...form,
      services: form.services
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      id: userId,
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert("Error saving profile");
    } else {
      navigate(`/rep/${userId}`);
    }
  };

  if (loading) return <div className="text-center p-10">Loading…</div>;

  return (
    <div>
      <Header />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Your Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 shadow rounded-xl">

          <input name="full_name" placeholder="Full Name" value={form.full_name} onChange={handleChange} className="input" />
          <input name="company" placeholder="Company" value={form.company} onChange={handleChange} className="input" />
          <input name="industry" placeholder="Industry" value={form.industry} onChange={handleChange} className="input" />
          <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="input" />
          <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="input" />

          <input name="website" placeholder="Website" value={form.website} onChange={handleChange} className="input" />
          <input name="experience_years" placeholder="Years of Experience" type="number" value={form.experience_years} onChange={handleChange} className="input" />

          <textarea name="services" placeholder="Services (comma separated)" value={form.services} onChange={handleChange} className="input h-24" />
          <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} className="input h-32" />

          {/* Photo */}
          <div>
            <label className="block mb-2 font-semibold">Profile Photo</label>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
            {form.photo_url && <img src={form.photo_url} alt="Preview" className="mt-4 w-32 h-32 rounded-full object-cover" />}
          </div>

          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl">
            Save Profile
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}