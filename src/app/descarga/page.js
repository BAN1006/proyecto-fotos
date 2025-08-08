"use client";

import Image from "next/image";

export default function DescargarZip() {
  const descargarZIP = async () => {
    const res = await fetch("/api/donwload-qr");

    if (!res.ok) {
      alert("Ocurrió un error al generar el archivo ZIP");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-codigos.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center justify-center">
        <button onClick={descargarZIP}>Descargar todos los QR</button>
      </div>
    </div>
  );
}
