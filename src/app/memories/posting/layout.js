import { Suspense } from "react";
import Loading from "./loading";
import { Toaster } from "@/components/ui/sonner";

export default function PostingLayout({children}) {
  return (
    <Suspense fallback={<Loading/>}>
      {children}
      <Toaster />
    </Suspense>
  );
}