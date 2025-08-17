"use client";

export default function DescargarExcel() {
  const descargarExcel = async () => {
    try {
      const res = await fetch("/api/descargar-excel");

      if (!res.ok) {
        alert("❌ Ocurrió un error al generar el Excel");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "links.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ Error descargando Excel:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <button
        onClick={descargarExcel}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Descargar Excel de Links
      </button>
    </div>
  );
}
