export const initDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("myDatabase", 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("myStore")) {
          db.createObjectStore("myStore", { keyPath: "id", autoIncrement: true });
        }
      };
  
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
  
      request.onerror = (event) => {
        reject("IndexedDB Error: " + event.target.errorCode);
      };
    });
  };
  