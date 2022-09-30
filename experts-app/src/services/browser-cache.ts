import localforage from "localforage";
import * as memoryDriver from 'localforage-driver-memory';
localforage.defineDriver(memoryDriver);
localforage.setDriver([localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE, memoryDriver._driver]);

export default class BrowserCacheService {
  static setItem(key: string, value: any): void {
    localforage.setItem(key, value, (err, value) => { });
  }

  static getItem(key: string, callback?: Function): any | null {
    return localforage
      .getItem(key)
      .then((value: any) => {
        if (callback) {
          callback(value)
        } else {
          return value
        };
      })
      .catch((err: Error) => {
        if (callback) {
          callback(false)
        };
        return false
      });
  }

  static removeItem(key: string): void {
    localforage.removeItem(key);
  }
}
