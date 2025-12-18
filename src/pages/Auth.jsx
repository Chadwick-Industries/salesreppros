import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert("Check your email for login link");
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-8 border rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Rep Login</h1>

      <input
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-3 rounded mb-4"
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-black text-white p-3 rounded"
      >
        {loading ? "Sending..." : "Send Login Link"}
      </button>
    </div>
  );
}