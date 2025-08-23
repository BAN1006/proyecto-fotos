import { Suspense } from "react";
import Loading from "./loading";

export default function AlbunLayout({children}) {
  return (
    <Suspense fallback={<Loading/>}>
      {children}
    </Suspense>
  );
}