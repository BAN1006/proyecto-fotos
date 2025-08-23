"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Posting() {
  const [loading, setLoading] = useState(false);

  const [dots, setDots] = useState("");

  const router = useRouter();
  // 👉 referencia al input file
  const inputRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500); // cada 500ms cambia

    return () => clearInterval(interval);
  }, []);

  const userSchema = z.object({
    image: z
      .any()
      .refine(
        (file) => file instanceof File && file.size > 0 && file.size < 5000000,
        { message: "La imagen debe ser un archivo menor a 5MB" }
      )
      .nullable(),
  });

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      image: null,
    },
  });
  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);

    const formdata = new FormData();
    formdata.append("image", values.image);

    const response = await fetch("/api/posting", {
      method: "POST",
      body: formdata,
    });

    const dataRes = await response.json();

    if (dataRes.passed) {
      setLoading(false);
      // limpiar file input
      if (inputRef.current) inputRef.current.value = "";

      form.reset();
      router.refresh();
      toast("Subida de archivo", {
        description: "Archivo subido correctamente",
        action: {
          label: "Entendido",
          onClick: () => console.log("Undo"),
        },
      });
    } else {
      setLoading(false);
      toast("Subida de archivo", {
        description: "Debes subir una foto",
        action: {
          label: "Entendido",
          onClick: () => console.log("Undo"),
        },
      });
    }
  });

  return (
    <div className="relative min-w-screen w-full flex items-center justify-center p-2 border-0">
      <div className="relative flex w-full max-w-6xl h-full justify-center flex-col md:flex-row border-0 rounded-2xl p-4 gap-6 sm:gap-2">
        <div className={`flex-1 lg:absolute`}>
          <div className="border-2 rounded-2xl border-black p-2 flex items-center justify-center flex-1 lg:min-w-lg min-w-[350px] lg:min-h-[790px] min-h-[680px] bg-[url('../../public/fondolg.png')] bg-center bg-no-repeat bg-cover">
            <Card
              className={
                "flex justify-center min-h-full bg-transparent border-none"
              }
            >
              <CardHeader className="flex-1/11 items-center justify-center">
                <CardTitle className="text-black text-center lg:text-xl pb-6">
                  Momentos que brillan
                </CardTitle>
                <CardDescription className="p-6 text-black lg:text-lg text-justify">
                  Cada risa, cada abrazo, cada paso de baile… esta fiesta fue
                  pura magia ✨ Aquí quedan los recuerdos que nos hicieron
                  vibrar. ¡Explora, revive y comparte tu foto favorita!
                </CardDescription>
              </CardHeader>
              <Form {...form}>
                <form className="flex-11/12" onSubmit={onSubmit}>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem className="pb-2 pl-6 pr-6">
                          <FormLabel className="text-black pb-2">
                            Foto de recuerdo
                          </FormLabel>
                          <FormControl>
                            <Input
                              ref={inputRef} // 👈 referencia al input file
                              className="file:text-black file:pr-1 text-black border-black"
                              accept="image/¨*"
                              type="file"
                              onChange={(e) =>
                                field.onChange(
                                  e.target.files ? e.target.files[0] : null
                                )
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex pt-2 pl-6 pr-6 items-center justify-center">
                    <Button className="lg:w-2xs md:w-96">
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <Image
                            className="flex-1/2 "
                            src="https://media.tenor.com/2aSuT7p_a_UAAAAm/peachcat-cat.webp"
                            width={30}
                            height={30}
                            objectFit="contain"
                            alt="Picture of the author"
                          />
                          <div className="flex-1/2">Subiendo{dots}</div>
                        </div>
                      ) : (
                        "Enviar"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
