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
      />

      <Footer />
    </div>
  );
};

export default MainLayout;
