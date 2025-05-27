"use server";

import data from "../../public/data/localData";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

var QRCode = require("qrcode");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);

const GenerarQR = () => {
  const estado = "";

  data.map((x) => {
    let link = "http://192.168.1.7:3000/?user="; //pendejo no te olvides cambiar la direccion antes de generar los QR
    let pathFile = join(__dirname, "qr", x.id + ".png");
    link = link.concat(x.id);
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
