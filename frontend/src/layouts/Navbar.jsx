import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout function from context
    navigate("/login"); // Redirect to the login page
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <Link to="/">My App</Link>
        </div>

        {/* Menu */}
        <div className="space-x-6">
          <Link to="/documents" className="text-gray-600 hover:text-gray-800">
            Documents
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-800"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
