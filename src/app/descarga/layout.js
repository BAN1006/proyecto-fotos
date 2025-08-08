import { Suspense } from "react";
import Loading from "./loading";

export default function DescargaLayout({children}) {
  return (
    <Suspense fallback={<Loading/>}>
      {children}
    </Suspense>
  );
}