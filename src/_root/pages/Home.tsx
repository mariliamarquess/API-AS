import { SignInApi } from '@/api/Signin.api';
import PostForm from '@/components/form/PostForm';
import CookieManager from '@/helpers/Cookie';
import { useUserContext } from '@/hooks/useUserContext';
import { useEffect } from 'react'

const Home = () => {
    const { login, isAuthenticated } = useUserContext()

  useEffect(() => {
    (async () => {
      try {
        const token = CookieManager.getCookie("accessToken");

        if (!token) return;

        const user = await SignInApi.show(token);

        login(user, token)
      } catch (error) {
        console.log(error)
      }
    })()
  }, []);

  if (!isAuthenticated) {
    return <h1>Carregando</h1>
  }

  return (
    <div>Home</div>
  )
}

export const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>

        <PostForm action="Create" />
      </div>
    </div>
  );
};

export default Home;