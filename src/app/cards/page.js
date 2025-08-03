"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ConfirmationSection from "./confirmation/ConfirmationSection";
import InformationSection from "./information/InformationSection";

export default function Cards({ children }) {
  const searchParams = useSearchParams();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const search = searchParams.get("user");

  const router = useRouter();

  const chage = () => {
    setMostrarFormulario(true);
    router.push("/cards?view=01&user=" + search);
  };

  let section = null;

  if (searchParams.has("view")) {
    const tab = searchParams.get("view");

    if (tab === "01") {
      section = <InformationSection />;
    } else if (tab === "02") {
      section = <ConfirmationSection />;
    }
  }

  useEffect(() => {
    if (searchParams.has("view")) {
      setMostrarFormulario(true);
    }
  }, []);

  return (
    <div className="relative min-w-screen w-full flex items-center justify-center p-2 border-0">
      <div className="relative flex w-full max-w-6xl h-full justify-center flex-col md:flex-row border-0 rounded-2xl p-4 gap-6 sm:gap-2">
        <div
          className={`flex-1/2 transition-transform duration-700 ease-in-out z-10 lg:absolute ${
            mostrarFormulario ? "lg:translate-x-[-53%]" : "lg:translate-x-[0%]"
          }
      `}
          onClick={chage}
        >
          <div className="border-2 rounded-2xl border-black p-2 flex items-center justify-center flex-1/2 lg:max-w-lg">
            <Image
              src="/card-black.png"
              width={600}
              height={600}
              className="rounded-2xl"
              alt="Picture of the author"
            />
          </div>
        </div>
        <div
          className={`flex-1/2 transition-all duration-700 ease-in-out lg:absolute ${
            mostrarFormulario
              ? "translate-x-[0%] lg:opacity-100 lg:translate-x-[53%] pointer-events-auto"
              : "opacity-100 translate-y-[-10%] lg:translate-y-[0%] lg:translate-x-[0%] pointer-events-none"
          }`}
        >
          {section ?? <div></div>}
        </div>
      </div>
    </div>
  );
}
