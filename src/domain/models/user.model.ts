import type {IUser} from "../interfaces/Iuser.model"

export class User implements IUser {

    email: string
    username: string
    password: string
    favorites: string[]
    constructor(email: string, username: string, password: string, favorites: string[]) {
        this.email = email
        this.username = username
        this.password = password
        this.favorites = favorites
    }
}