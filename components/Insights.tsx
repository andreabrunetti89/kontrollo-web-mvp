export default function Insights({items}:{items:string[]}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Insights</h3>
      <ul className="space-y-2 text-sm">
        {items.map((t,i)=>(<li key={i}>{t}</li>))}
      </ul>
    </div>
  );
}
