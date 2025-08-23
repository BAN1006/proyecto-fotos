// app/api/descargar-excel/route.ts
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import data from "../../../../public/data/localData";
import { encryptParam } from "@/app/api/utilities/utilidades";

export async function GET(request) {
  try {
    // Creamos los links
    const linksData = data.map((x) => {
      var linkFinal = "";
      // URL completa (incluye protocolo y dominio)
      const fullUrl = request.url;
      // Dominio solamente (ej: "midominio.com")
      const dominio = new URL(fullUrl).host;
      let encrypt = encryptParam(x.id);

      if (dominio != "localhost:3000") {
        linkFinal = "http://" + dominio + "/cards?user=" + encrypt;
      } else {
        linkFinal = "http://" + "192.168.1.21" + "/cards?user=" + encrypt;
      }

      return {
        ID: x.id,
        Nombre: x.nombre || "",
        Link: linkFinal,
      };
    });

    // Generar el Excel en memoria
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(linksData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Links");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // Responder como descarga
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="links.xlsx"',
      },
    });
  } catch (error) {
    console.error("❌ Error al generar Excel:", error);
    return NextResponse.json(
      { error: "Error al generar Excel", detalles: String(error) },
      { status: 500 }
    );
  }
}
