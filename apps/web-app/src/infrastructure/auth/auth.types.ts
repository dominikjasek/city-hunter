import { User } from '@auth0/auth0-react'

export const AUTH0_CUSTOM_NAMESPACE = 'https://city-hunter.vercel.app' //defined in auth0 rules - needs to have unique namespace to prevent conflict withd defaults https://auth0.com/docs/secure/tokens/json-web-tokens/create-namespaced-custom-claims

interface Permissions {
    permissions: string[]
}

export interface IUserWithCustomIdToken extends User {
    [AUTH0_CUSTOM_NAMESPACE]: Permissions
}

export type IUser = User & Permissions