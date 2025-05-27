// app/lugar/page.tsx o layout.tsx
import { Suspense } from "react";
import Lugar from "./page";

export default function LugarPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Lugar />
    </Suspense>
  );
}