type Props = { label: string; value: number | string; trend?: "up"|"down"|"flat" };
export default function KPI({ label, value, trend="flat" }: Props) {
  const color = trend === "up" ? "text-brand-pos" : trend === "down" ? "text-brand-neg" : "text-brand.text";
  const show = typeof value === "number" ? new Intl.NumberFormat("it-IT").format(value) : value;
  return (
    <div className="card">
      <div className="text-xs text-brand.neutral">{label}</div>
      <div className={`mt-1 text-2xl font-bold ${color}`}>{show}</div>
    </div>
  );
}
