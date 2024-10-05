import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set(key: string, value: any) {
    const result = await this._storage?.set(key, value);
    console.log(result);
  }

  async get(key: string) {
    const value = await this._storage?.get(key);
    return value;
  }

  async remove(key: string) {
    const value = await this._storage?.remove(key);
  }

  async clear() {
    const value = await this._storage?.clear();
  }
}
