import { useEffect } from 'react';
import { SignInApi } from '@/api/Signin.api';
import CookieManager from '@/helpers/Cookie';
import { useUserContext } from '@/hooks/useUserContext';
import CreatePost from './CreatePost';
import { usePrologue } from '@/context/PrologueContext';

const Home = () => {
  const { login, isAuthenticated } = useUserContext();
  const { isPrologueActive, setIsPrologueActive } = usePrologue();

  useEffect(() => {
    (async () => {
      try {
        const cookieToken = CookieManager.getCookie("accessToken");
        const localToken = localStorage.getItem("token");

        const token = cookieToken || localToken;
        if (!token) return;

        const user = await SignInApi.show(token);
        login(user, token);
        setIsPrologueActive(true);
      } catch (error) {
        console.log("Erro ao autenticar:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (isPrologueActive) {
      const timer = setTimeout(() => {
        setIsPrologueActive(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isPrologueActive]);

  // if (!isAuthenticated) {
  //   return <h1>Carregando...</h1>;
  // }

  if (isPrologueActive) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black transition-opacity duration-500">
        <div className="flex flex-col items-center text-center gap-4 px-4 animate-fadeIn">
          <h1 className="text-white text-2xl md:text-4xl font-semibold">
            “How do you wake up from the matrix when you don't know you're in the matrix?”
          </h1>
          <h2 className="text-light-3 text-sm md:text-base italic">The Social Dilemma – 2020</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden w-full flex">
      <div className="flex-1">
        <CreatePost />
      </div>
    </div>
  );
};

export default Home;
