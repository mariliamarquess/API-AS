export interface IUser {
    id: string
    email: string
    password: string
    name: string
    username: string
    imageUrl?: string;
}

export interface AuthResponse {
  user: IUser;
  accessToken: string;
}