"use client";
import { useState } from "react";
export default function Settings() {
  const [be, setBe] = useState(290);
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Impostazioni</h1>
      <div className="card space-y-2">
        <label className="label">Break-even giornaliero (€)</label>
        <input type="number" value={be} onChange={e=>setBe(parseInt(e.target.value||"0"))} className="input" />
        <p className="text-xs text-brand.neutral/80">Usato per la linea orizzontale nei grafici.</p>
      </div>
    </main>
  );
}
