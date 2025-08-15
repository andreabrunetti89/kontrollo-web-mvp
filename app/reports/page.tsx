"use client";
export default function Reports() {
  async function download() {
    const res = await fetch("/api/report", { method:"POST" });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "report_mensile.pdf"; a.click();
    window.URL.revokeObjectURL(url);
  }
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Report mensile</h1>
      <button className="btn" onClick={download}>Scarica PDF</button>
      <p className="text-sm text-brand.neutral">Versione semplificata: titolo, 4 KPI e un grafico statico placeholder.</p>
    </main>
  );
}
