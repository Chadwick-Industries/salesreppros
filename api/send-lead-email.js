export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ message: "Send lead email endpoint is working" });
  }

  const lead = req.body;

  console.log("📩 New lead received:", lead);

  // TODO: Add real email sending here via Resend, Mailgun, etc.

  return res.status(200).json({ message: "Email sent (simulated)", lead });
}