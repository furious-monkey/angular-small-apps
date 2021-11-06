import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  get(key: string): any {
    try {
      const serialItem = localStorage.getItem(key);
      if (serialItem) {
        return JSON.parse(serialItem);
      } else {
        return undefined;
      }
    } catch(e) {
      console.log(e);
      return undefined;
    }
  }

  set(key: string, value: any) {
    try {
      const serialItem = JSON.stringify(value);
      localStorage.setItem(key, serialItem);
    } catch(e) {
      console.log(e);
    }
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear;
  }
}
