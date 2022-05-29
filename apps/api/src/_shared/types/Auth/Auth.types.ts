export interface LoginRequest {
    email: string
    firstName: string
    lastName: string
    sub: string
}

export type LoginResponse = void

export enum UserPermission {
    WritePlaceSuggestion = 'write:place-suggestion',
    ReadPlaceSuggestion = 'read:place-suggestion',
}