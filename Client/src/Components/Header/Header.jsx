import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const data = useSelector((store) => store.userData);
  const token = data?.token;
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); // assumes you have LOGOUT reducer
  };

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">
      {/* Top Govt Info */}
<div className="bg-[#1565C0] text-white text-center py-1">
  <p className="text-sm font-semibold leading-none m-0">
    भारत सरकार | Government of India
  </p>
  <p className="text-sm font-semibold leading-none m-0">
    कार्मिक, लोक शिकायत| Ministry of Personnel, Public
    Grievances
  </p>
</div>
      

      {/* Navbar */}
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-12 py-3 bg-[#F5F5F5]">
        {/* Logo + Title */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Civic Eye Logo"
            className="w-16 h-16 object-contain" // smaller logo
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-5">
          <a
            href="#"
            className="text-[#212121] hover:text-[#1565C0] transition font-medium"
          >
            About Us
          </a>
          <a
            href="#"
            className="text-[#212121] hover:text-[#1565C0] transition font-medium"
          >
            View Department Works
          </a>
          <a
            href="#"
            className="text-[#212121] hover:text-[#1565C0] transition font-medium"
          >
            View Department Info
          </a>
          <a
            href="#"
            className="text-[#212121] hover:text-[#1565C0] transition font-medium"
          >
            Contact Support
          </a>

          {/* Conditional Login/Logout */}
          {token ? (
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-full bg-[#E0E0E0] text-[#212121] font-semibold hover:bg-gray-400 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => (window.location.href = "/login")}
              className="px-4 py-1.5 rounded-full bg-[#FF9800] text-white font-semibold hover:bg-orange-600 transition"
            >
              Login
            </button>
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
          <a
            href="#"
            className="text-[#212121] hover:text-[#1565C0] transition font-medium"
          >
            About Us
          </a>
          <a
            href="#"
            className="text-[#212121] hover:text-[#1565C0] transition font-medium"
          >
            View Department Works
          </a>
          <a
            href="#"
            className="text-[#212121] hover:text-[#1565C0] transition font-medium"
          >
            View Department Info
          </a>
          <a
            href="#"
            className="text-[#212121] hover:text-[#1565C0] transition font-medium"
          >
            Contact Support
          </a>

          {/* Conditional Login/Logout in mobile */}
          {token ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-[#E0E0E0] text-[#212121] font-semibold hover:bg-gray-400 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => (window.location.href = "/login")}
              className="px-4 py-2 rounded-full bg-[#FF9800] text-white font-semibold hover:bg-orange-600 transition"
            >
              Login
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
