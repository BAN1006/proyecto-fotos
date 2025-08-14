"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import appFirebase from "../../public/data/credenciales";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Fotos() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const db = getFirestore(appFirebase);

  const [lista, setLista] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getLista = async () => {
      try {
        const reg = await getDocs(collection(db, "fotos"));
        const datos = reg.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLista(datos);
      } catch (e) {
        console.log(e);
      }
    };
    getLista();
  }, []);

  useEffect(() => {
    const isMobileDevice = () => {
      const verify = /Android|iPhone|iPad|iPod|Windows Phone|webOS/i.test(
        navigator.userAgent
      );
      if (verify) {
        router.push("/notaccess");
      } else {
        const clave = prompt("Indique la contraseña:");
        if (clave != "Leon@rs10") {
          router.push("/notaccess");
        }
      }
    };
    isMobileDevice();
  }, []);

  return (
    <div className="bg-[url('../../public/bg.png')] bg-contain bg-center bg-no-repeat">
      <div className="p-2 grid grid-cols-1 grid-rows-12 lg:min-h-screen bg-transparent">
        <div className="flex items-center justify-center row-span-1 text-black"></div>
        <div className="border-0 col-span-1 row-span-11 rounded-2xl flex md:[items-start] items-center justify-center">
          <Carousel
            className="rounded-2xl border-0 p-4 flex-1 max-w-full"
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-1">
              {lista.map((saludo) => (
                <CarouselItem
                  key={saludo.id}
                  className="pl-6 sm:basis-[33%] lg:basis-[33%]"
                >
                  <div className="border-2 border-black rounded-2xl min-h-[682px] max-h-[682px] min-w-[570px] max-w-[570px]">
                    <div className="bg-transparent">
                      <div className="flex-col">
                        <div className="flex flex-col items-center justify-center pt-3.5">
                          <div className="bg-[url('../../public/test.png')] bg-contain bg-center bg-no-repeat w-[500px] h-[520px] flex items-center justify-center">
                            <div className="relative w-[400px] h-[420px]">
                              <Image
                                src={saludo.imageUrl}
                                fill
                                className="object-contain"
                                alt="Picture of the author"
                              />
                            </div>
                          </div>

                          <h5 className="text-black text-center font-serif pt-4 px-[28px]">
                            {saludo.mensaje}
                          </h5>
                        </div>
                        <div className="text-right">
                          <p className="text-black text-right pt-2 pr-[5%]">
                            <strong>{saludo.user}</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
