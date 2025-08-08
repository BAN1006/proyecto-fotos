// app/api/descargar-qr/route.ts
import JSZip from "jszip";
import { NextResponse } from "next/server";
import { readdir, readFile } from 'fs/promises';
import path from "path";

export async function GET() {
  const zip = new JSZip();

  // Ruta de la carpeta con los QR
  const carpetaQR = path.join(process.cwd(), "qr-storage");

  try {
    const archivos = await readdir(carpetaQR);

    // Filtrar solo imágenes PNG/JPG/JPEG
    const imagenes = archivos.filter((archivo) =>
      archivo.match(/\.(png|jpg|jpeg)$/)
    );

    for (const archivo of archivos) {
      const rutaCompleta = path.join(carpetaQR, archivo);
      const contenido = await readFile(rutaCompleta);
      zip.file(archivo, contenido);
    }

    const contenidoZip = await zip.generateAsync({ type: "nodebuffer" });

    return new NextResponse(contenidoZip, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="qr-codigos.zip"',
      },
    });
  } catch (error) {
    console.error("❌ Error al generar el ZIP:", error);

    return new NextResponse(
      JSON.stringify({ error: "Error al generar el ZIP", detalles: error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
