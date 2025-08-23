import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(request) {
  // URL completa (incluye protocolo y dominio)
  const fullUrl = request.url;
  // Dominio solamente (ej: "midominio.com")
  const dominio = new URL(fullUrl).host;
  const url = "http://" + dominio + "memories/posting"; // 👉 la URL a codificar

  // Generar QR como buffer PNG
  const qrBuffer = await QRCode.toBuffer(url, { type: "png", width: 300 });

  return new NextResponse(qrBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": 'attachment; filename="qr-code.png"', // fuerza descarga
    },
  });
}
