import { Suspense } from "react";
import Loading from "./loading";

export default function CardsLayout({children}) {
  return (
    <Suspense fallback={<Loading/>}>
      {children}
    </Suspense>
  );
}