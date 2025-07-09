import { createContext } from "react";
import type { AuthResponse, IUser } from "@/api/models/IUser";

export interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (userData: AuthContextType["user"], token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);