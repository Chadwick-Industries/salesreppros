import React, { useState, useEffect } from "react";

export default function App() {
  const [reps, setReps] = useState([]);
  const [activeRep, setActiveRep] = useState(null);

  useEffect(() => {
    setReps([
      { id: '1', name: 'Paul Chadwick', company: 'White Cap', location: 'Tumwater, WA', referrals: 4, referral_earnings: 12000 }
    ]);
  }, []);

  return (
    <div style={{ fontFamily: 'Arial', padding: 24 }}>
      <h1>SalesrepPros</h1>
      <p>National Sales Rep Marketplace + Referral Platform</p>

      <h2>Public Rep Directory</h2>
      {reps.map(r => (
        <div key={r.id} style={{ border: '1px solid #ccc', padding: 12, marginBottom: 8 }}>
          <strong>{r.name}</strong> — {r.company}<br/>
          {r.location}<br/>
          Referrals: {r.referrals}<br/>
          <button onClick={() => setActiveRep(r)}>View</button>
        </div>
      ))}

      {activeRep && (
        <div style={{ marginTop: 16, padding: 16, border: '2px solid black' }}>
          <h3>{activeRep.name}</h3>
          <p>{activeRep.company}</p>
          <p>{activeRep.location}</p>
          <textarea placeholder="What do you need?" style={{ width: '100%' }} />
          <button style={{ marginTop: 8 }}>Send Lead</button>
        </div>
      )}

      <footer style={{ marginTop: 40, fontSize: 12 }}>
        © {new Date().getFullYear()} SalesrepPros
      </footer>
    </div>
  );
}
