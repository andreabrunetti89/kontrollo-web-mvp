import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";

export async function POST() {
  const doc = new PDFDocument({ size: "A4", margin: 48 });
  const chunks: any[] = [];
  return new Promise((resolve) => {
    doc.on("data", (c)=>chunks.push(c));
    doc.on("end", ()=>{
      const blob = Buffer.concat(chunks);
      resolve(new NextResponse(blob, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=report_mensile.pdf"
        }
      }));
    });

    // Header
    doc.fillColor("#050B16").fontSize(20).text("KONTROLLO — Report Mensile", { align: "left" });
    doc.moveDown(1);

    // KPI demo
    doc.fontSize(12).fillColor("#000").text("KPI (demo):");
    doc.moveDown(0.5);
    doc.text("Incassi: €135.044");
    doc.text("Utile netto: €40.390");
    doc.text("Utile giornaliero: €133");
    doc.text("Giorni in perdita: 9");

    doc.moveDown(1);
    doc.text("Grafico (placeholder)", { underline: true });
    doc.rect(doc.x, doc.y + 10, 500, 120).stroke();

    doc.end();
  });
}
