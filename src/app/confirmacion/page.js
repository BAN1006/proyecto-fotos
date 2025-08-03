"use client";

import Image from "next/image";
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
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import data from "../../../public/data/localData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import appFirebase from "../../../public/data/credenciales";
import { getDocs, collection, getFirestore } from "firebase/firestore";

export default function Envio() {
  const db = getFirestore(appFirebase);

  const searchParams = useSearchParams();

  const search = searchParams.get("user");

  const user = data.find((element) => element.id === search);

  useEffect(() => {
    const getLista = async () => {
      try {
        const reg = await getDocs(collection(db, "fotos"));
        const docs = [];
        reg.forEach((doc) => {
          if (doc.data().user === user.nombre) {
            router.push("/lugar?user=" + user.id);
          }
        });
      } catch (e) {
        console.log(e);
      }
    };
    getLista();
  }, []);

  const [loading, setLoading] = useState(false);

  const [dots, setDots] = useState("");

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500); // cada 500ms cambia

    return () => clearInterval(interval);
  }, []);

  const router = useRouter();

  const userSchema = z.object({
    mensaje: z.string().min(1).max(500),
    image: z.instanceof(File).refine((file) => {
      if (file.size < 5000000 && file.size >= 0) {
        return true;
      }
      return false;
    }),
  });

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      mensaje: "",
      image: new File([], ""),
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    console.log(values);
    setLoading(true);

    const formdata = new FormData();
    formdata.append("mensaje", values.mensaje);
    formdata.append("image", values.image);
    formdata.append("user", user.nombre);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formdata,
    });

    const dataRes = await response.json();

    if (dataRes.passed) {
      setLoading(false);
      router.push("/lugar?user=" + user.id);
    }
  });

  return (
    <div className="relative min-w-screen w-full flex items-center justify-center p-2 border-2">
      <div className="relative flex w-full max-w-6xl h-full justify-center flex-col md:flex-row border-2 rounded-2xl p-4 gap-6 sm:gap-2">
        <div
          className={`flex-1/2 transition-transform duration-700 ease-in-out z-10 lg:absolute ${
            mostrarFormulario
              ? "lg:translate-x-[-53%]"
              : "lg:translate-x-[0%]"
          }
      `}
          onClick={() => setMostrarFormulario(true)}
        >
          <div className="border-2 rounded-2xl border-black p-2 flex items-center justify-center lg:max-w-lg">
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
              ? "translate-x-[0%] lg:opacity-100 lg:translate-x-[53%] pointer-events-auto]"
              : "opacity-0 translate-y-[-10%] lg:translate-y-[0%] lg:translate-x-[0%] pointer-events-none"
          }
      `}
        >
          <div
            className={`lg:min-h-[793px] flex justify-center items-center rounded-2xl border-black border-2 p-2 bg-[url('../../public/fondo.png')] bg-center bg-no-repeat bg-cover lg:max-w-lg`}
          >
            <Card
              className={
                "flex justify-center min-h-full bg-transparent border-0 border-white "
              }
            >
              <CardHeader className="flex-1/11 items-center justify-center">
                <CardTitle className="text-black text-center lg:text-lg">
                  Sube tu recuerdo
                </CardTitle>
                <CardDescription className="pl-6 pr-6 text-black lg:text-lg">
                  Hola <strong>{user.apodo}</strong> sube un recuerdo que tengas
                  conmigo y no olvides dejarme un mensaje.
                </CardDescription>
              </CardHeader>
              <Form {...form}>
                <form className="flex-11/12" onSubmit={onSubmit}>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="mensaje"
                      render={({ field }) => (
                        <FormItem className="pb-4 pl-6 pr-6">
                          <FormLabel className="text-black pb-2">
                            Deja tu mensaje
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className="border-black text-black sm:max-w-sm max-h-[220px] min-h-[220px] text-xs"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
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
                            //layout="fill"
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
