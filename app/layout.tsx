import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "KONTROLLO",
  description: "Dashboards-as-a-Service"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="min-h-screen">
        <div className="mx-auto max-w-6xl p-4 space-y-4">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h1 className="text-2xl font-semibold">KONTROLLO</h1>
            <nav className="flex flex-wrap gap-3 text-sm">
              <Link href="/" className="underline">Dashboard</Link>
              <Link href="/import" className="underline">Import</Link>
              <Link href="/what-if" className="underline">What-if</Link>
              <Link href="/reports" className="underline">Report</Link>
              <Link href="/settings" className="underline">Impostazioni</Link>
              <Link href="/login" className="underline">Login</Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
