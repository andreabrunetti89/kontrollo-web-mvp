"use client";
import { useEffect, useState } from "react";
import KPI from "@/components/KPI";
import BreakEvenChart from "@/components/BreakEvenChart";
import Insights from "@/components/Insights";

type Demo = {
  months: {m:string; revenue:number; net:number; be:number;}[];
  kpi: { revenue:number; net:number; dailyNet:number; lossDays:number; best:{month:string; net:number; pctAboveAvg:number}; projection:number };
};

export default function Dashboard() {
  const [demo, setDemo] = useState<Demo|null>(null);

  useEffect(()=>{
    fetch("/demo/data.json").then(r=>r.json()).then(setDemo);
  },[]);

  const insights = demo ? [
    `📈 Mese migliore: ${demo.kpi.best.month} con utile €${demo.kpi.best.net.toLocaleString("it-IT")} (${(demo.kpi.best.pctAboveAvg*100).toFixed(0)}% sopra la media).`,
    `⚠ Giorni sotto break-even: ${demo.kpi.lossDays}.`,
    `🔮 Proiezione mese corrente: €${demo.kpi.projection.toLocaleString("it-IT")}.`
  ] : [];

  return (
    <main className="space-y-6">
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI label="Incassi (€)" value={demo?.kpi.revenue ?? 0} trend="up" />
        <KPI label="Utile netto (€)" value={demo?.kpi.net ?? 0} trend="up" />
        <KPI label="Utile giornaliero (€)" value={demo?.kpi.dailyNet ?? 0} trend="down" />
        <KPI label="Giorni in perdita" value={demo?.kpi.lossDays ?? 0} trend="down" />
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="card md:col-span-2">
          <BreakEvenChart data={demo?.months ?? []} />
        </div>
        <div className="card">
          <Insights items={insights} />
        </div>
      </section>
    </main>
  );
}
