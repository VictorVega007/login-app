import { useState } from "react";
import { Menu, X, LogOut, Home, User, Info, Book } from "lucide-react";
import useAuth from "../../../hooks/auth-hook/use-auth.hook";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer">
          <Home size={28} href="/dashboard" />
          <span className="text-xl font-semibold">My Dashboard</span>
        </div>

        <nav className="hidden md:flex space-x-6">
          <a
            href="#"
            className="hover:text-blue-300 flex items-center space-x-1"
          >
            <User size={20} />
            <span>Profile</span>
          </a>
          <a
            href="#"
            className="hover:text-blue-300 flex items-center space-x-1"
          >
            <Info size={20} />
            <span>About</span>
          </a>
          <a
            href="#"
            className="hover:text-blue-300 flex items-center space-x-1"
          >
            <Book size={20} />
            <span>Docs</span>
          </a>
        </nav>

        <button
          onClick={logout}
          className="cursor-pointer hidden md:flex items-center space-x-1 bg-red-400 px-4 py-2 rounded-lg hover:bg-red-500 transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-blue-700 p-4 mt-2 rounded-lg flex flex-col space-y-4">
          <a
            href="#"
            className="flex items-center space-x-2 hover:text-blue-300"
          >
            <User size={20} />
            <span>Profile</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 hover:text-blue-300"
          >
            <Info size={20} />
            <span>About</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 hover:text-blue-300"
          >
            <Book size={20} />
            <span>Docs</span>
          </a>

          <button
            onClick={logout}
            className="flex items-center space-x-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
