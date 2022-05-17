import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import { IAuthReducer, initialState, ITokens, IUser, UserRole } from '~/infrastructure/auth/auth.types'
import { setTokens, setUser } from '~/infrastructure/auth/AuthSlice'
import { AuthRepository } from '~/infrastructure/auth/repository/UseAuthRepository'
import { useAppDispatch, useAppSelector } from '~/store/UseAppStore'

export class AuthStore {
  private readonly _auth: IAuthReducer
  private readonly _dispatch: ThunkDispatch<{ auth: IAuthReducer }, undefined, AnyAction> & Dispatch<AnyAction>
  private readonly _authRepository = new AuthRepository()
  private readonly _navigate = useNavigate()

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

  public get role(): UserRole | null {
    return this.user?.role ?? null
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
    this._navigate('/')
  }
}

export const useAuthStore = () => {
  const auth = new AuthStore()

  return {
    auth
  }
}