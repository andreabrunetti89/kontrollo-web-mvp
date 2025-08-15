import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { parse } from "csv-parse/sync";

function parseDate(s: string) {
  const iso = /^\d{4}-\d{2}-\d{2}$/;
  const it = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (iso.test(s)) return s;
  const m = s.match(it);
  if (m) return `${m[3]}-${m[2]}-${m[1]}`;
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ ok:false, error:"Nessun file" }, { status:400 });
    const text = await file.text();

    const delimiter = text.indexOf(";")>-1 ? ";" : ",";
    const rows: string[][] = parse(text, { delimiter, relax_column_count: true });
    if (!rows.length) return NextResponse.json({ ok:false, error:"File vuoto" }, { status:400 });

    const headers = rows[0].map(h=>h.trim().toLowerCase());
    const data = rows.slice(1).map(r => Object.fromEntries(r.map((v,i)=>[headers[i]||`col${i}`, (v||"" ).trim()])));

    const supabase = supabaseServer();
    const toInsert:any[] = [];

    for (const row of data) {
      const dateRaw = row["date"] || row["data"];
      const catRaw = row["category"] || row["categoria"] || row["type"] || row["tipo"];
      const amountRaw = row["amount"] || row["importo"];
      if (!dateRaw || !catRaw || !amountRaw) continue;
      const date = parseDate(String(dateRaw));
      const amount = Number(String(amountRaw).replace(",", ".").replace("€",""));
      if (!date || Number.isNaN(amount)) continue;

      toInsert.push({
        account_id: null, // TODO bind to session user
        date,
        type: ["ricavi","revenue"].includes(String(catRaw).toLowerCase()) ? "revenue"
            : ["costo merci","cogs"].includes(String(catRaw).toLowerCase()) ? "cogs"
            : "opex",
        amount,
        source: row["source"] || row["fonte"] || row["metodo"] || row["metodo pagamento"] || null,
        note: row["note"] || row["descrizione"] || null,
        tags: null
      });
    }

    if (!toInsert.length) return NextResponse.json({ ok:false, error:"Nessuna riga valida" }, { status:400 });

    const { error } = await supabase.from("transactions").insert(toInsert);
    if (error) return NextResponse.json({ ok:false, error: error.message }, { status:500 });

    return NextResponse.json({ ok:true, inserted: toInsert.length });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e.message || "Errore" }, { status:500 });
  }
}
