"use client";

import { useSearchParams } from "next/navigation";

import Fotos from "../vistas/Fotos";

export default function Main() {
  const searchParams = useSearchParams();

  const search = searchParams.get("user");

  return <div>{<Fotos />}</div>;
}
