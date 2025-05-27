"use client"

import Image from "next/image";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Fotos() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <div className="p-2 grid grid-cols-4 lg:min-h-screen bg-transparent">
      <div className="p-3 col-span-3 border-2 rounded-2xl flex md:[items-start] items-center justify-center">
        <Carousel
          className="rounded-2xl border-2 p-6 flex-1 max-w-full"
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-6 sm:basis-[33%] lg:basis-[50%]"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-2xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="p-2 col-span-1 grid grid-rows-2 gap-4 bg-transparent">
        <Card className={"min-h-full min-w-full"}>
          <CardContent className={"w-[100%] h-[100%] flex items-center justify-center"}>
            <Image
            className="md:[flex-1] lg:[w-80 h-80]"
              src="https://randomqr.com/assets/images/randomqr-256.png"
              alt="Imagen remota"
              width={300}
              height={300}
            />
          </CardContent>
        </Card>
        <Card className={"items-center min-h-auto min-w-auto"}>
          <CardContent>
            <Image
              src="https://randomqr.com/assets/images/randomqr-256.png"
              alt="Imagen remota"
              width={300}
              height={300}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}