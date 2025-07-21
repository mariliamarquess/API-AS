import { IUser } from "@/types";

export interface IPost {
  id: number;
  content: string;
  createdAt: string;
  creator: IUser
};