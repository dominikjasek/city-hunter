export interface IUserName {
    firstName: string
    lastName: string
}

export interface IUser {
    id: number
    name: IUserName
    email: string
    photoUrl: string,
}