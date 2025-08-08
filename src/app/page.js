"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import Fotos from "../vistas/Fotos";
import GenerarQR from "@/app/api/utilities/generarQR";

export default function Main() {
  const searchParams = useSearchParams();

  const search = searchParams.get("user");

  useEffect(() => {
    GenerarQR();
  }, []);

  return <div>{<Fotos />}</div>;
}
