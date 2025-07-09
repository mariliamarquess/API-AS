import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export const useUserContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserContext must be used within an AuthProvider");
  }
  return context;
};