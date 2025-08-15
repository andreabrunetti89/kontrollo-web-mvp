import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supa = createClient(url, key);

const demo = JSON.parse(fs.readFileSync("public/demo/data.json","utf8"));
const { data: acc, error: ea } = await supa.from("accounts").insert({ name: "Demo Srl" }).select("id").single();
if (ea) { console.error(ea); process.exit(1); }
const account_id = acc.id;

const tx = [];
let day = 1;
for (const m of demo.months) {
  // add 3 rows per month: revenue, cogs, opex
  tx.push({ account_id, date: `2025-${String((day%12)+1).padStart(2,"0")}-01`, type:"revenue", amount: m.revenue, source:"POS", note:"demo" });
  tx.push({ account_id, date: `2025-${String((day%12)+1).padStart(2,"0")}-01`, type:"cogs", amount: Math.round(m.revenue*0.4), source:"", note:"demo" });
  tx.push({ account_id, date: `2025-${String((day%12)+1).padStart(2,"0")}-01`, type:"opex", amount: Math.round(3000 + Math.random()*1000), source:"", note:"demo" });
  day++;
}

const { error: et } = await supa.from("transactions").insert(tx);
if (et) { console.error(et); process.exit(1); }

const { error: ep } = await supa.from("parameters").insert({ account_id, breakeven_daily: 290 });
if (ep) { console.error(ep); process.exit(1); }

console.log("Demo data inserted. Account:", account_id);
