import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../data/routes";
import logo2 from "../../assets/logo2.png";
import ProfileDropDown from "./profileDropDown";

const Header = () => {
  const data = useSelector((store) => store.userData);
  const role = data?.role;
  console.log("Role value:", role);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication flag from localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    
    // Clear sessionStorage as well
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("userRole");
    
    // Dispatch a generic action (though it won't do anything without a reducer)
    dispatch({ type: "USER_LOGOUT" });
    
    // Redirect to login page
    navigate(routes.userLogin);
    
    // Force reload to completely reset the application state
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // Check authentication using both Redux AND localStorage
  const isAuthenticated = (role && role.trim() !== "") || localStorage.getItem("isAuthenticated") === "true";

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">
      {/* Top Govt Info */}
      <div className="bg-[#1565C0] text-white text-center py-1">
        <p className="text-sm font-semibold leading-none m-0">
          भारत सरकार | Government of India
        </p>
        <p className="text-sm font-semibold leading-none m-0">
          कार्मिक, लोक शिकायत| Ministry of Personnel, Public Grievances
        </p>
      </div>

      {/* Navbar */}
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-12 py-1 bg-[#F5F5F5]">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to={isAuthenticated ? routes.userDashboard : routes.home}>
            <img
              src={logo2}
              alt="Civic Eye Logo"
              className="w-40 h-20 object-contain"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-5">
          <Link
            to={routes.aboutUs}
            className="text-[#212121] hover:text-[#1565C0] transition font-medium"
          >
            About Us
          </Link>
          <Link
            to={routes.departmentWorks}
            className="text-[#212121] hover:text-[#1565C0] transition font-medium"
          >
            View Department Works
          </Link>
          <Link
            to={routes.departmentInfo}
            className="text-[#212121] hover:text-[#1565C0] transition font-medium"
          >
            View Department Info
          </Link>
          <Link
            to={routes.contactSupport}
            className="text-[#212121] hover:text-[#1565C0] transition font-medium"
          >
            Contact Support
          </Link>

          {/* Conditional Login/Logout */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <ProfileDropDown />
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-full bg-[#E0E0E0] text-[#212121] font-semibold hover:bg-gray-400 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to={routes.userLogin}
              className="px-4 py-2 rounded-full bg-[#FF9800] text-white font-semibold hover:bg-orange-600 transition"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden border rounded-lg p-2 text-lg bg-gray-200 hover:bg-gray-300 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-3 px-6 pb-4 bg-[#F5F5F5] border-t">
          <Link
            to={routes.aboutUs}
            className="text-[#212121] hover:text-[#1565C0] transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            to={routes.departmentWorks}
            className="text-[#212121] hover:text-[#1565C0] transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            View Department Works
          </Link>
          <Link
            to={routes.departmentInfo}
            className="text-[#212121] hover:text-[#1565C0] transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            View Department Info
          </Link>
          <Link
            to={routes.contactSupport}
            className="text-[#212121] hover:text-[#1565C0] transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Contact Support
          </Link>

          {/* Conditional Login/Logout (Mobile) */}
          {isAuthenticated ? (
            <div className="flex flex-col space-y-3">
              <ProfileDropDown />
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full bg-[#E0E0E0] text-[#212121] font-semibold hover:bg-gray-400 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to={routes.userLogin}
              className="px-4 py-2 rounded-full bg-[#FF9800] text-white font-semibold hover:bg-orange-600 transition"
              onClick={() => setIsOpen(false)}
            >
              login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;