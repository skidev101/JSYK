import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LogoutModal from "../components/LogoutModal";
import CreateTopicModal from "../components/CreateTopicModal";
import ProfileDrawer from "../components/ProfileDrawer";

const MainLayout = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header
        onLogoutClick={() => setShowLogoutModal(true)}
        onShowProfile={() => setShowProfileDrawer(true)}
      />

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Modals are now global and controlled here */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
      <CreateTopicModal
        isOpen={showTopicModal}
        onClose={() => setShowTopicModal(false)}
      />
      <ProfileDrawer 
         show={showProfileDrawer}
         onClose={() => setShowProfileDrawer(false)}
         username="@ski101"
         avatarUrl="/form.webp"
         email="skidev101@gmail.com"
         bio="Just a chill guy but if u play with me, you won't like it. I love chess, football, and others. I LOVE GOD"
      />

      <Footer />
    </div>
  );
};

export default MainLayout;
