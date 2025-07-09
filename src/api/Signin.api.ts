import { $axios } from "@/helpers/$axios";
import type { AuthResponse } from "./models/IUser";

export class SignInApi {
    public static async create(body: { email: string; password: string }): Promise<AuthResponse> {
        const response = await $axios.post<AuthResponse>("/entrar", body);
        
        return response.data;
    }

    public static async show(token: string): Promise<AuthResponse["user"]> {
        const response = await $axios.get<AuthResponse["user"]>("/entrar", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response.data)
        
        return response.data;
    }
}