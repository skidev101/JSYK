import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProfileDrawer from "../../../../features/dashboard/components/ProfileDrawer/ProfileDrawer";
import ActionModal from "../../UI/Modals/Action/ActionModal";

const MainLayout = () => {
  const [action, setAction] = useState("");
  const [header, setHeader] = useState("");
  const [warning, setWarning] = useState("");
  const [showActionModal, setShowActionModal] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);

  const logout = () => {
    setShowActionModal(true);
    setAction("Logout");
    setHeader("Logout");
    setWarning("Are you sure you want to logout?");
  };

  const deleteAccount = () => {
    setShowActionModal(true);
    setAction("Delete");
    setHeader("Delete account😪");
    setWarning("Are you sure? All data will be lost");
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header onShowProfile={() => setShowProfileDrawer(true)} />

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Modals are now global and controlled here */}
      <ActionModal
        isOpen={showActionModal}
        onClose={() => setShowActionModal(false)}
        warning={warning}
        header={header}
        action={action}
      />

      <ProfileDrawer
        show={showProfileDrawer}
        onClose={() => setShowProfileDrawer(false)}
        onLogoutClick={() => logout()}
        onDeleteClick={() => deleteAccount()}
      />

      <Footer />
    </div>
  );
};

export default MainLayout;
