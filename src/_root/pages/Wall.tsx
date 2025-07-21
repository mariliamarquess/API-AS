import { useEffect, useState } from "react";
import { PostApi } from "@/api/Post.api";
import { useUserContext } from "@/hooks/useUserContext";
import PostCard from "@/components/shared/PostCard";
import { IPost } from "@/api/models/IPost";

const WallOfOblivion = () => {
  const { user, accessToken } = useUserContext(); // Ajuste aqui
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!accessToken) return; // Use accessToken
      try {
        const res = await PostApi.getMyPosts(accessToken); // Passe accessToken
        setPosts(res);
      } catch (err) {
        console.error("Erro ao buscar posts:", err);
      }
    };

    fetchPosts();
  }, [accessToken]);

  return (
    <section className="w-full max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-white">Wall of Oblivion</h2>
      {posts.length === 0 ? (
        <p className="text-light-3 text-center mt-20">Você ainda não criou nenhum post.</p>
      ) : (
        <ul className="flex flex-col gap-6">
          {posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default WallOfOblivion;