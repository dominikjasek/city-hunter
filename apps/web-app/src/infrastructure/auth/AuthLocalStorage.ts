import { ITokens } from '#types/Auth'
import { IUser } from '#types/User'
import { IAuthReducer } from '~/infrastructure/auth/auth.types'
import { LocalStorage } from '~/infrastructure/localStorage/localStorage'

export class AuthLocalStorage {
  private readonly _localStorage = new LocalStorage()

  public get auth(): IAuthReducer | null {
    return JSON.parse(this._localStorage.get('auth')) ?? null
  }

  public get user(): IUser | null {
    return this.auth?.user ?? null
  }

  public get tokens(): ITokens | null {
    return this.auth?.tokens ?? null
  }

  public setUser(user: IUser | null): void {
    return this._localStorage.set('auth', JSON.stringify({
      user,
      tokens: this.tokens
    }))
  }

  public setTokens(tokens: ITokens): void {
    return this._localStorage.set('auth', JSON.stringify({
      tokens,
      user: this.user
    }))
  }

  public setAuth(auth: IAuthReducer): void {
    return this._localStorage.set('auth', JSON.stringify(auth))
  }

  public removeAuth(): void {
    return this._localStorage.remove('auth')
  }
}
