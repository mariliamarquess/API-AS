import { Outlet } from "react-router-dom";

import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import PostForm from "@/components/form/PostForm";
import { useUserContext } from "@/hooks/useUserContext";

const RootLayout = () => {
  const { isAuthenticated } = useUserContext();

  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full flex-col">
            <PostForm action="Create" />
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
};

export default RootLayout;
