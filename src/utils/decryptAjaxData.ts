import CryptoJS from 'crypto-js';
import { IKey } from '../types';
export default async (encryptedData: string,keys:IKey): Promise<any> => {
    const decryptedData = CryptoJS.enc.Utf8.stringify(
      CryptoJS.AES.decrypt(encryptedData, keys.secondKey, {
        iv: keys.iv,
      })
    );

    return JSON.parse(decryptedData);
  };
