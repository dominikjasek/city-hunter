export class LocalStorage {
  private readonly _localStorage: Storage = window.localStorage

  constructor() {
  }

  public set(key: string, value: string): any {
    this._localStorage.setItem(key, value)
  }

  public get(key: string): any {
    return this._localStorage.getItem(key)
  }

  public remove(key: string) {
    this._localStorage.removeItem(key)
  }

  public clear() {
    this._localStorage.clear()
  }
}
