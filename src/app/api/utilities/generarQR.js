"use server";

import data from "../../../../public/data/localData";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { encryptParam } from "@/app/api/utilities/utilidades";

var QRCode = require("qrcode");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);

const GenerarQR = () => {
  const estado = "";

  data.map((x) => {
    //let link = "https://proyecto-fotos-yfwg.vercel.app/cards?user="; //pendejo no te olvides cambiar la direccion antes de generar los QR
    let link = "192.168.1.19:3000/cards?user=";
    let pathFile = join(process.cwd(), 'qr-storage', x.id + ".png");
    var encrypt = encryptParam(x.id)
    console.log(encrypt);

    link = link.concat(encrypt);
    //pathFile = pathFile.concat(x.id, ".png");
    QRCode.toFile(
      pathFile,
      link,
      {
        color: {
          dark: "#000", // Blue dots
          light: "#fff", // Transparent background
        },
      },
      (err) => {
        if (err) throw err;
      }
    );
  });
};

export default GenerarQR;
