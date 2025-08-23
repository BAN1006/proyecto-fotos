"use client";

export default function DescargarQr() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <a
        href="/api/qr"
        download="qr-code.png"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Descargar QR
      </a>
    </div>
  );
}
