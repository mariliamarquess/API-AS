import { Outlet } from "react-router-dom";

import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import { usePrologue } from "@/context/PrologueContext";

const RootLayout = () => {
  const { isPrologueActive } = usePrologue();

  return (
    <div className="w-full md:flex">
      <Topbar />

      {/* LeftSidebar só aparece após o prólogo */}
      {!isPrologueActive && <LeftSidebar />}

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
};

export default RootLayout;
