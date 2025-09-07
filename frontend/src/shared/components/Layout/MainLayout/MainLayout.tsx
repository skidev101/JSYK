import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { ProfileDrawer } from "@/features/profile";

const MainLayout = () => {
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header onShowProfile={() => setShowProfileDrawer(true)} />

      <main className="flex-grow">
        <Outlet />
      </main>

      <ProfileDrawer
        show={showProfileDrawer}
        onClose={() => setShowProfileDrawer(false)}
      />

      <Footer />
    </div>
  );
};

export default MainLayout;
