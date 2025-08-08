import { Suspense } from "react";
import Lugar from "./page";
import Loading from "./loading";

export default function NotaccessLayout() {
  return (
    <Suspense fallback={<Loading/>}>
      <Lugar />
    </Suspense>
  );
}