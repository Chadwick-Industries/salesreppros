import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  console.log("🔥 FUNCTION HIT");
  console.log("METHOD:", req.method);
  console.log("HEADERS:", req.headers);
  console.log("BODY:", req.body);

  if (req.method !== "POST") {
    console.log("❌ Not a POST request");
    return res.status(200).json({ message: "Not a POST" });
  }

  console.log("✅ POST RECEIVED");

  return res.status(200).json({ message: "Webhook received" });
}