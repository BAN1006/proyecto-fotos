import { Suspense } from "react";
import Loading from "./loading";

export default function QrLayout({children}) {
  return (
    <Suspense fallback={<Loading/>}>
      {children}
    </Suspense>
  );
}