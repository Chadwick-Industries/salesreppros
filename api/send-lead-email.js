import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ message: "Send lead email endpoint is working" });
  }

  const lead = req.body;

  const {
    rep_id,
    name,
    email,
    phone,
    message,
  } = lead;

  try {
    await resend.emails.send({
      from: "SalesRepPros <leads@salesreppros.com>",
      to: ["paul.chadwick@whitecap.com"], // TEMP — we’ll make this dynamic next
      subject: "🔥 New Lead from SalesRepPros",
      html: `
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr />
        <p>Log in to SalesRepPros to respond.</p>
      `,
    });

    console.log("✅ Email sent successfully");

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Email send failed:", error);
    return res.status(500).json({ error: "Email failed" });
  }
}