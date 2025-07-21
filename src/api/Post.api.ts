import { $axios } from "@/helpers/$axios";
import { IUser } from "./models/IUser";
import { IPost } from "./models/IPost";

export class PostApi {
  public static async getByUserId(userId: IUser["id"]) {
    const response = await $axios.get(`/posts/user/${userId}`);

    return response.data;
  }

    public static async create(data: Pick<IPost, "content">,token: string): Promise<Pick<IPost, "content">> {
    const response = await $axios.post(`/posts`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    return response.data;
  }

    public static async getMyPosts(token: string): Promise<IPost[]> {
    const response = await $axios.get(`/posts/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}
