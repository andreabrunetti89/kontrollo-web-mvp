"use client";
import React, { useState } from "react";

export default function ImportPage() {
  const [preview, setPreview] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (!f) return;
    const text = await f.text();
    const lines = text.split(/\r?\n/).filter(Boolean);
    setPreview(lines.slice(0, 10));
  }

  async function upload() {
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/import", { method: "POST", body: form });
    const j = await res.json();
    alert(j.ok ? `Import completato: ${j.inserted} righe` : `Errore: ${j.error}`);
  }

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Import CSV</h1>
      <div className="card space-y-2">
        <input type="file" accept=".csv" onChange={onFile} />
        <p className="text-sm text-brand.neutral">Formati: separatore ; o , — date DD/MM/YYYY o YYYY-MM-DD.</p>
        <button className="btn" onClick={upload} disabled={!file}>Carica</button>
      </div>
      {preview.length>0 && (
        <div className="card">
          <h2 className="font-semibold mb-2">Preview</h2>
          <pre className="text-xs whitespace-pre-wrap">{preview.join("\n")}</pre>
        </div>
      )}
    </main>
  );
}
