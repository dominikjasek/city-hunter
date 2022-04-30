import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '~/src/store/UseAppStore'
import { IAuthReducer, initialState, ITokens, IUser } from '~/src/utils/auth/auth.types'
import { setTokens, setUser } from '~/src/utils/auth/AuthSlice'
import { AuthRepository } from '~/src/utils/auth/repository/UseAuthRepository'

export class AuthStore {
  private readonly _auth: IAuthReducer
  private readonly _dispatch: ThunkDispatch<{ auth: IAuthReducer }, undefined, AnyAction> & Dispatch<AnyAction>
  private readonly _authRepository = new AuthRepository()

  // private readonly authRepository:

  constructor() {
    this._auth = useAppSelector((state) => state.auth)
    this._dispatch = useAppDispatch()
  }

  public get user(): IUser | null {
    return this._auth.user
  }

  public get tokens(): ITokens | null {
    return this._auth.tokens
  }

  public get isLoggedIn(): boolean {
    return this.user !== null
  }

  public setUser(user: IUser): void {
    this._dispatch(setUser(user))
  }

  public setTokens(tokens: ITokens): void {
    this._dispatch(setTokens(tokens))
  }

  public loginWithGoogle(): void {
    window.location.href = `${import.meta.env.VITE_REACT_APP_API_URL}/auth/google-login`
  }

  public async logout(): Promise<void> {
    await this._authRepository.logout()
    this._dispatch(setTokens(initialState.tokens))
    this._dispatch(setUser(initialState.user))
  }
}

export const useAuthStore = () => {
  const auth = new AuthStore()

  return {
    auth
  }
}