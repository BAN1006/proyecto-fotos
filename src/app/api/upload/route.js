import { v2 as cloudinary } from "cloudinary";
import appFirebase from "../../../../public/data/credenciales";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { NextResponse } from "next/server";

// Configuration
cloudinary.config({
  cloud_name: "dfj7bc3te",
  api_key: "996161521946247",
  api_secret: "QajF0OVqa29FKb6lZ_H2Iy6-SUA", // Click 'View API Keys' above to copy your API secret
});

const db = getFirestore(appFirebase);

export async function POST(request) {
  //subir imagen
  let urlImage = "";

  const data = await request.formData();
  const image = data.get("image");

  if (image.size > 0) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadResult = await new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream((error, uploadResult) => {
          return resolve(uploadResult);
        })
        .end(buffer);
    });
    urlImage = uploadResult.secure_url
  } else {
    urlImage = "https://res.cloudinary.com/dfj7bc3te/image/upload/v1747441825/w5ktkdbl4v0wdnri6x8p.jpg"
  }

  /* bytes = await image.arrayBuffer();
  buffer = Buffer.from(bytes);*/

  if (!image) {
    /* return NextResponse.json("No se ha subido la imagen", { status: 400 }); */
  } else {
    /*
  uploadResult = await new Promise((resolve) => {
    cloudinary.uploader
      .upload_stream((error, uploadResult) => {
        return resolve(uploadResult);
      })
      .end(buffer);
  }); */
  }

  //enviar los datos a firebase

  const newSubida = {
    user: data.get("user"),
    mensaje: data.get("mensaje"),
    imageUrl: urlImage
  };

   await addDoc(collection(db,"fotos"),{
    ...newSubida
  })

  return NextResponse.json({
    message: "Imagen subida",
    passed: true,
    //url: uploadResult.secure_url,
  });
}
