"use client";
import { useState } from "react";
import KPI from "@/components/KPI";

export default function WhatIf() {
  const [price, setPrice] = useState(0);
  const [cogs, setCogs] = useState(0);
  const [staff, setStaff] = useState(0);

  // demo baseline
  const baseline = { revenue: 135044, cogs: 54000, opex: 40000, staff: 20000, net: 41044 };

  const revenue = Math.round(baseline.revenue * (1 + price/100));
  const cogsAdj = Math.round(baseline.cogs * (1 + cogs/100));
  const staffAdj = Math.round(baseline.staff * (1 + staff/100));
  const net = revenue - cogsAdj - (baseline.opex - baseline.staff + staffAdj);

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">What-if</h1>
      <div className="card grid md:grid-cols-3 gap-4">
        <div>
          <label className="label">Prezzo medio</label>
          <input type="range" min="-10" max="10" value={price} onChange={e=>setPrice(parseInt(e.target.value))} className="w-full"/>
          <div className="text-sm">{price}%</div>
        </div>
        <div>
          <label className="label">COGS</label>
          <input type="range" min="-10" max="10" value={cogs} onChange={e=>setCogs(parseInt(e.target.value))} className="w-full"/>
          <div className="text-sm">{cogs}%</div>
        </div>
        <div>
          <label className="label">Costo personale</label>
          <input type="range" min="-10" max="10" value={staff} onChange={e=>setStaff(parseInt(e.target.value))} className="w-full"/>
          <div className="text-sm">{staff}%</div>
        </div>
      </div>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI label="Ricavi (what-if)" value={revenue} trend={price>=0?"up":"down"} />
        <KPI label="COGS (what-if)" value={cogsAdj} trend={cogs<=0?"up":"down"} />
        <KPI label="Personale (what-if)" value={staffAdj} trend={staff<=0?"up":"down"} />
        <KPI label="Utile (what-if)" value={net} trend={net>=baseline.net?"up":"down"} />
      </section>
    </main>
  );
}
