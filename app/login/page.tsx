"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function sendMagicLink() {
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } });
    setMsg(error ? `Errore: ${error.message}` : "Controlla la tua email per il link di accesso.");
  }

  return (
    <main className="max-w-md mx-auto space-y-3">
      <h1 className="text-2xl font-semibold">Login</h1>
      <input className="input w-full" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <button className="btn" onClick={sendMagicLink}>Invia magic link</button>
      {msg && <p className="text-sm text-brand.neutral">{msg}</p>}
    </main>
  );
}
