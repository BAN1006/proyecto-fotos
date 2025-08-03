"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import Fotos from "../vistas/Fotos";
import Envio from "../vistas/Envio";
import GenerarQR from "@/vistas/GenQR";

export default function Main() {
  const searchParams = useSearchParams();

  const search = searchParams.get("user");

  useEffect(() => {
    GenerarQR();
  }, []);

  return <div>{<Fotos />}</div>;
}
