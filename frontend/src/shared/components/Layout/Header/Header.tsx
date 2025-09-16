import { User2  } from "lucide-react";

interface HeaderProps {
  onShowProfile?: () => void;
}

const Header = ({ onShowProfile }: HeaderProps) => {
  return (
    <header className="fixed top-0 z-50 w-full flex items-center justify-between shadow-sm p-4 backdrop-blur-md ">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 colored-text">JSYK</h1>

      <div className="flex items-center gap-4 sm:gap-8">
        <button
          onClick={onShowProfile}
          title="profile"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gray-100 shadow flex items-center justify-center hover:cursor-pointer active:scale-[0.95] hover:bg-gray-300 transition duration-200 outline-0"
        >
          <User2 size={25} className="text-gray-600 px-0.5" />
        </button>

      </div>
    </header>
  );
};

export default Header;
