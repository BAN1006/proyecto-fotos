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
import { Input } from "@/components/ui/input";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import data from "../../public/data/localData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import appFirebase from "../../public/data/credenciales";
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
    console.log("si entra");
  }, []);

  const router = useRouter();

  const userSchema = z.object({
    mensaje: z.string().min(1).max(500),
    image: z.instanceof(File).refine((file) => {
      if (file.size < 5000000 && file.size > 0) {
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
      router.push("/lugar?user=" + user.id);
    }
  });

  console.log(form.formState.errors);

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
        <Card
          className={
            "flex-1/2 lg:[w-[35%] min-h-[50%]] sm:[w-[50%] min-h-[320px] flex justify-center"
          }
        >
          <CardHeader>
            <CardTitle>Sube tu recuerdo</CardTitle>
            <CardDescription>
              Hola <strong>{user.apodo}</strong> sube un recuerdo que tengas
              conmigo y no olvides dejarme un mensaje.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <CardContent>
                <FormField
                  control={form.control}
                  name="mensaje"
                  render={({ field }) => (
                    <FormItem className={"pb-2"}>
                      <FormLabel>Deja tu mensaje</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className={"pb-2"}>
                      <FormLabel>Foto de recuerdo</FormLabel>
                      <FormControl>
                        <Input
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
              <CardFooter className={"gap-2.5 pt-1.5"}>
                <Button className={"flex-1/2"}>Enviar</Button>
                <Button variant="outline" className={"flex-1/2"}>
                  <a
                    onClick={() => {
                      router.push("/lugar?user=" + user.id);
                    }}
                  >
                    No tengo :c
                  </a>
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
