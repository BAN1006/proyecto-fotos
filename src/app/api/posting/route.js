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
    urlImage = uploadResult.secure_url;
  } else {
    return NextResponse.json({
      message: "Error al subir imagen",
      passed: false,
    });
  }

  //enviar los datos a firebase

  const newSubida = {
    imageUrl: urlImage,
  };

  await addDoc(collection(db, "memories"), {
    ...newSubida,
  });

  return NextResponse.json({
    message: "Imagen subida",
    passed: true,
  });
}
