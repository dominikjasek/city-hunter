import React, { createContext, useState } from "react"
import { IAuthContext } from "~/src/utils/auth/types.auth"

interface AuthProviderProps {
  children: React.ReactNode
}

// hack typescript https://stackoverflow.com/a/61336826
export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)

  const authContext: IAuthContext = {
    isLoggedIn,
    setIsLoggedIn,
  }

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
