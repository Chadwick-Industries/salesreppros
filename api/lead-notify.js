import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { rep_id, name, email, message } = req.body;

    // Create Supabase client with SERVICE_ROLE for server-side use
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Fetch the rep's email
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", rep_id)
      .single();

    if (error) throw error;

    const repEmail = profile.email;

    // Send email using Resend
    const sendResult = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "SalesRepPros <noreply@salesreppros.com>",
        to: repEmail,
        subject: "You Received a New Lead!",
        html: `
          <h2>You received a new lead!</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),
    });

    return res.status(200).json({ success: true, sendResult });
  } catch (err) {
    console.error("Lead notify error:", err);
    return res.status(500).json({ error: err.message });
  }
}