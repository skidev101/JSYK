import { useState } from "react";
import ProfileDrawer from "../components/ProfileDrawer";
import { LogOut, User2 } from "lucide-react";
import LogoutModal from "../components/LogoutModal";

type HeaderProps = {
  onLogoutClick?: () => void; 
  onShowProfile?: () => void;
};

const Header = ({ onLogoutClick, onShowProfile }: HeaderProps) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full flex items-center justify-between shadow-md p-4 backdrop-blur-md rounded-b-4xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">JSYK</h1>

      <div className="flex items-center gap-4 sm:gap-8">
        <button
          onClick={onShowProfile}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gray-200 flex items-center justify-center hover:bg-gray-400 transition duration-200"
        >
          <User2
            size={26}
            className="text-gray-800 px-0.5 hover:cursor-pointer active:scale-[0.95]"
          />
        </button>

        <div
          onClick={onLogoutClick}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center hover:bg-gray-200 transition duration-200"
        >
          <LogOut
            size={26}
            className="text-red-600 px-0.5 hover:cursor-pointer active:scale-[0.95]"
          />
        </div>
      </div>
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal((prev) => !prev)}
      />

      <ProfileDrawer
        show={showProfile}
        onClose={() => setShowProfile((prev) => !prev)}
        username="ski101"
        avatarUrl="/form.webp"
        email="skidev101@gmail.com"
        bio="Just a chill guy but if u play with me, you won't like it. i love chess football and others. I LOVE GOD"
      />
    </header>
  );
};

export default Header;
