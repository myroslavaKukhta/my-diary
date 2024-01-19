import { enc, AES } from 'crypto-js';
import pako from 'pako';

const ENCRYPTION_KEY = 'fox'; //  секретний ключ

export const saveDataToLocalStorage = (key, data) => {
    const encryptedData = AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
    const compressedData = pako.gzip(encryptedData, { to: 'string' });
    localStorage.setItem(key, compressedData);
};

export const loadDataFromLocalStorage = (key) => {
    const compressedData = localStorage.getItem(key);
    if (!compressedData) return null;

    const encryptedData = pako.ungzip(compressedData, { to: 'string' });
    const decryptedData = AES.decrypt(encryptedData, ENCRYPTION_KEY).toString(enc.Utf8);

    return decryptedData ? JSON.parse(decryptedData) : null;
};
