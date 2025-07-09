export interface IUser {
    id: string
    email: string
    password: string
    imageUrl?: string;
}

export interface AuthResponse {
  user: IUser;
  accessToken: string;
}