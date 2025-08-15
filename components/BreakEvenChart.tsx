"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function BreakEvenChart({data}:{data: {m:string; revenue:number; net:number; be:number;}[]}) {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#2C3446" strokeDasharray="3 3" />
          <XAxis dataKey="m" stroke="#A6A6A6" />
          <YAxis stroke="#A6A6A6" />
          <Tooltip contentStyle={{ background: "#0B1222", border: "1px solid #2C3446", color: "#E3D2B5" }} />
          <Line type="monotone" dataKey="revenue" stroke="#E3D2B5" dot={false} strokeWidth={2} />
          <Line type="monotone" dataKey="net" stroke="#008B8B" dot={{ r: 2 }} strokeWidth={2} />
          <Line type="monotone" dataKey="be" stroke="#F07CA3" strokeDasharray="6 4" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
