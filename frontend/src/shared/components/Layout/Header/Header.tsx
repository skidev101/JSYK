import { UserRound } from "lucide-react";

interface HeaderProps {
  onShowProfile?: () => void;
}

const Header = ({ onShowProfile }: HeaderProps) => {
  return (
    <header className="app-header">
      <a className="app-brand" href="/dashboard" aria-label="JSYK dashboard">
        <span className="app-brand-mark">J</span>
        <span>jsyk</span>
      </a>

      <div className="app-header-actions">
        <span className="app-header-caption">your anonymous inbox</span>
        <button
          onClick={onShowProfile}
          title="Open profile"
          className="app-profile-button"
        >
          <UserRound size={18} />
        </button>

      </div>
    </header>
  );
};

export default Header;
