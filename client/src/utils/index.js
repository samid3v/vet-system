import CryptoJS from 'crypto-js'

function encryptData(data, key) {
     const jsonData = JSON.stringify(data);
   
     const encryptedData = CryptoJS.AES.encrypt(jsonData, key).toString();
   
     localStorage.setItem('petFarm'+key, encryptedData);
}

function decryptData(key) {
     const encryptedData = localStorage.getItem('petFarm'+key);
   
     if (!encryptedData) {
       console.error('No encrypted data found in local storage');
       return null;
     }
   
     const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key);
   
     const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
   
     const originalData = JSON.parse(decryptedData);
   
     return originalData;
}

function clearLocalStorage(key) {
     localStorage.removeItem('petFarm'+key);
}

export {encryptData, decryptData, clearLocalStorage}
   
   