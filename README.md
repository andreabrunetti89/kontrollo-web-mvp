# KONTROLLO — Web App MVP (Responsive + Demo data)

## Avvio rapido
1) `npm install`
2) `cp .env.example .env.local` (lascia `NEXT_PUBLIC_DEMO_MODE=1` per vedere i dati demo)
3) `npm run dev` → http://localhost:3000

## Passare ai dati reali (Supabase)
1) Crea un progetto su Supabase, copia URL e ANON key
2) Incolla in `.env.local` (`NEXT_PUBLIC_DEMO_MODE=0` per usare il DB)
3) In Supabase → SQL Editor → esegui `schema.sql`
4) (Opzionale) `node scripts/seed-demo.mjs` per popolare dati demo su Supabase
5) Implementa il binding `account_id` alle sessioni utente nel backend

## Funzioni incluse
- Dashboard con KPI e grafico utile/break-even
- Import CSV `/import` (separatori `;`/`,`, date IT)
- What-if (simulazioni con slider)
- Report PDF (semplificato): `/reports`
- Brand KONTROLLO embedded (tailwind.config.js)

## Da completare per produzione
- Autenticazione completa e ruoli (Owner/Manager/Staff)
- Allocazione costi mensili nella view (giorni in perdita)
- Email report via SMTP
- Deploy su Vercel + variabili d'ambiente
