import CryptoJS from "crypto-js";
import { IKey } from "../types";
export default async ($: any, id: string, keys: IKey): Promise<string> => {
  const encryptedKey = CryptoJS.AES.encrypt(id, keys.key, {
    iv: keys.iv,
  });
  const scriptValue = $("script[data-name='episode']").attr(
    "data-value"
  ) as string;
  const decryptedToken = CryptoJS.AES.decrypt(scriptValue, keys.key, {
    iv: keys.iv,
  }).toString(CryptoJS.enc.Utf8);
  return `id=${encryptedKey}&alias=${id}&${decryptedToken}`;
};
