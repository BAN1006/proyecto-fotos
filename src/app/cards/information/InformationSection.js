"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import data from "../../../../public/data/localData";
import { useEffect } from "react";
import appFirebase from "../../../../public/data/credenciales";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function InformationSection() {
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
            router.push("/cards?view=01&user=" + user.id);
          }
        });
      } catch (e) {
        console.log(e);
      }
    };
    getLista();
  }, []);

  return (
    <div className="lg:min-h-[793px] flex items-center justify-center border-2 rounded-2xl border-black flex-col flex-1/2 p-6 gap-2 bg-[url('../../public/fondolg.png')] bg-center bg-no-repeat bg-cover lg:max-w-lg lg:p-11">
      <div className="flex-1/8 lg:text-xl sm:text-xs pl-3 pr-3">
        <p className="text-black pt-1 text-justify lg:pt-8">
          Hola <strong>{user.apodo}</strong>, con esto confirmaste tu
          asistencia, ahora unas cosas a tomar en cuenta:
        </p>
      </div>
      <div className="flex-7/8 pl-1 pr-1 lg:[pl-3 pr-3]">
        <div className="rounded-2xl border-black border-2 pt-2">
          <div>
            <p className="text-black text-center lg:text-xl sm:text-xs pb-1 lg:pb-3">
              <strong>Codigo de vestimenta</strong>
            </p>
          </div>
          <div className="flex flex-row items-center justify-center gap-8 pb-1 lg:pb-3">
            <Image
              src="/female.png"
              width={60}
              height={60}
              alt="Picture of the author"
            />
            <Image
              src="/male.png"
              width={60}
              height={60}
              alt="Picture of the author"
            />
          </div>
          <div>
            <p className="text-black text-center lg:text-xl sm:text-xs pb-1 pl-2 pr-2 lg:pb-3">
              <strong>
                ¡El color negro y parecidos se reservan para quinceañera!
              </strong>
            </p>
          </div>
        </div>
        <hr className="mt-1.5 mb-1.5 lg:[mt-3.5.5 mb-3.5.5]" />
        <div className="rounded-2xl border-black border-2 pt-1">
          <div>
            <p className="text-black text-center lg:text-xl sm:text-xs pb-1 lg:pb-4">
              <strong>Lugar y fecha</strong>
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1.5 pb-1 pl-1 pr-1 lg:[pl-3 pr-3]">
            <div className="flex flex-row gap-2.5 items-center justify-center pl-1 pr-1 pb-1 lg:[pl-3 pr-3 pb-4]">
              <Image
                className="lg:pl-2"
                src="/location.png"
                width={60}
                height={60}
                alt="Picture of the author"
              />
              <p className="text-black text-center lg:text-xl sm:text-xs">
                <strong>Salón Rosa Dorada</strong> Jr. José Gálvez 835
              </p>
            </div>
            <div className="flex flex-row gap-2.5 items-center justify-center pl-1 pr-1 pb-1 lg:[pl-3 pr-3 pb-4]">
              <Image
                className="lg:pl-2"
                src="/date.png"
                width={60}
                height={60}
                alt="Picture of the author"
              />
              <p className="text-black text-center lg:text-xl sm:text-xs">
                Sábado 23 agosto a las 7:00 P.M.
              </p>
            </div>
            <div>
              <p className="text-black text-center lg:text-xl sm:text-xs pb-1 lg:pb-4">
                <strong>
                  Se pide puntualidad para poder realizar la ceremonia lo mas
                  temprano posible y asi poder disfrutar mas de la fiesta
                </strong>
              </p>
            </div>
            <div className="pb-4">
              <Link
                href={`/cards?view=02&user=${search}`}
                className="text-black border-[1px] p-2 border-black rounded-2xl text-center align-middle hover:text-white hover:bg-black"
              >
                Enviar confirmacion
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
