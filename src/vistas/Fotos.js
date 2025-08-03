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
import {
  getDocs,
  collection,
  getFirestore,
  QuerySnapshot,
} from "firebase/firestore";

export default function Fotos() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const db = getFirestore(appFirebase);

  const [lista, setLista] = useState([]);

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
                  <div className="border-2 border-black rounded-2xl bg-[url('../../public/fondo.png')] bg-contain bg-center bg-no-repeat">
                    <Card className="bg-transparent">
                      <CardContent className="flex aspect-square items-center justify-center antialiased ">
                        <div className="flex-col">
                          <div className="flex flex-col items-center justify-center pt-3.5">
                            <div className="relative w-[400px] h-[420px]">
                              <Image
                                
                                src={saludo.imageUrl}
                                fill
                                alt="Picture of the author"
                              />
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
                      </CardContent>
                    </Card>
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
