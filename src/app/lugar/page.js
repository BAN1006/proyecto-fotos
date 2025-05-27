"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import data from "../../../public/data/localData";
import { Suspense, useEffect } from "react";
import appFirebase from "../../../public/data/credenciales";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Lugar() {
  const db = getFirestore(appFirebase);

  const searchParams = useSearchParams();

  const search = searchParams.get("user");

  const user = data.find((element) => element.id === search);

  const router = useRouter();

  useEffect(() => {
    const getLista = async () => {
      try {
        const reg = await getDocs(collection(db, "fotos"));
        reg.forEach((doc) => {
          if (!(doc.data().user === user.nombre)) {
            router.push("/?user=" + user.id);
          }
        });
      } catch (e) {
        console.log(e);
      }
    };
    getLista();
    console.log("si entra");
  }, []);

  return (
    <div className="min-w-screen lg:min-h-screen min-h-fit p-2 border-2 flex items-center justify-center">
      <div className="lg:w-[65%] border-2 rounded-2xl p-4 gap-4 flex flex-col md:flex-row md:w-[80%]">
        <div className="border-2 rounded-2xl p-2 flex items-center justify-center flex-1/2">
          <Image
            src="/descarga.jpg"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
        <div className="border-2 rounded-2xl flex flex-row md:flex-col flex-1/2 p-4 gap-4">
          <div className="flex-2/3 border-2 flex items-center justify-center gap-2">
            <div className="flex-row gap-2 text-center pb-2">
              <h1 className="font-semibold flex-1/3 pb-2 pt-2">
                NUMERO DE MESA
              </h1>
              <Image
                className="border-2 flex-2/3"
                src="/1.png"
                width={350}
                height={350}
                alt="Picture of the author"
              />
            </div>
          </div>
          <div className="flex-1/3">
            <p>
              Hola <strong>{user.apodo}</strong> bienvenid@, espero lo pases de
              lo mejor y nos podemos divertir en este dia tan especial para mi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
