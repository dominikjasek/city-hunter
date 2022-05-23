import { useAuth0 } from '@auth0/auth0-react'
import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit'
import { ITokens } from '@shared/types/Auth/Auth.types'
import { useNavigate } from 'react-router-dom'
import { IAuthRepository, useAuthRepository } from '~/infrastructure/ApiRepository/AuthRepository'
import { IAuthReducer, IUser, UserRole } from '~/infrastructure/auth/auth.types'
import { setTokens, setUser } from '~/infrastructure/auth/AuthSlice'
import { useAppDispatch, useAppSelector } from '~/store/UseAppStore'

export class AuthStore {
  private readonly _auth: IAuthReducer
  private readonly _dispatch: ThunkDispatch<{ auth: IAuthReducer }, undefined, AnyAction> & Dispatch<AnyAction>
  private readonly _navigate = useNavigate()
  private readonly _loginWithRedirect: any

  constructor(private readonly _authRepository: IAuthRepository) {
    this._auth = useAppSelector((state) => state.auth)
    this._dispatch = useAppDispatch()
    const { loginWithRedirect } = useAuth0()
    this._loginWithRedirect = loginWithRedirect
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

  public get isAdmin(): boolean {
    return this.role === UserRole.admin
  }

  public setUser(user: IUser): void {
    this._dispatch(setUser(user))
  }

  public setTokens(tokens: ITokens): void {
    this._dispatch(setTokens(tokens))
  }

  public login() {
    this._loginWithRedirect()
  }

}

export const useAuthStore = () => {
  const authRepository = useAuthRepository()

  const auth = new AuthStore(authRepository)

  return {
    auth
  }
}