import CryptoJS from "crypto-js";

function toUrlSafeBase64(str) {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromUrlSafeBase64(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return str;
}

export function encryptParam(value) {
  const encrypted = CryptoJS.AES.encrypt(value.toString(), "Leon@rs10").toString();
  return toUrlSafeBase64(encrypted);
}

export function decryptParam(cipher) {
  const normalBase64 = fromUrlSafeBase64(cipher);
  const bytes = CryptoJS.AES.decrypt(normalBase64, "Leon@rs10");
  return bytes.toString(CryptoJS.enc.Utf8);
}