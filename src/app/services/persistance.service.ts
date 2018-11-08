import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistanceService {
  constructor() {}
  private _isAllowed: boolean;

  public get isAllowed(): boolean {
    return this._isAllowed;
  }

  public set isAllowed(value: boolean) {
    this._isAllowed = value;
  }

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
}
