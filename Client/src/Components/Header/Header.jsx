import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../data/routes";
import logo2 from "../../assets/logo2.png";
import ProfileDropDown from "./profileDropDown";

const Header = () => {
  const userData = useSelector((store) => store.userData);
  const deptData = useSelector((store) => store.departmentData);
  const userRole = userData?.role;
  const deptRole = deptData?.role;
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };


  return (
    <header className="w-full sticky top-0 z-50 shadow-md">
      {/* Top Govt Info */}
      <div className="bg-[#1565C0] text-white text-center py-2">
        <p className="text-sm font-semibold leading-tight m-0">
          भारत सरकार | Government of India
        </p>
        <p className="text-sm font-semibold leading-tight m-0">
          कार्मिक, लोक शिकायत | Ministry of Personnel, Public Grievances
        </p>
      </div>

      {/* Navbar */}
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-20 py-3 bg-[#F5F5F5]">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to={userRole === "" ? (deptRole === "" ? routes.deptLogin : routes.deptDashboard) : routes.userDashboard}>
            <img
              src={logo2}
              alt="Civic Eye Logo"
              className="w-40 h-20 object-contain"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className=" lg:flex items-center space-x-6">
          <Link
            to={routes.aboutUs}
            className="text-[#212121] hover:text-[#1565C0] transition-colors duration-200 font-medium px-2 py-1"
          >
            About Us
          </Link>
          <Link
            to={routes.departmentWorks}
            className="text-[#212121] hover:text-[#1565C0] transition-colors duration-200 font-medium px-2 py-1"
          >
            View Department Works
          </Link>
          <Link
            to={routes.departmentInfo}
            className="text-[#212121] hover:text-[#1565C0] transition-colors duration-200 font-medium px-2 py-1"
          >
            View Department Info
          </Link>
          <Link
            to={routes.contactSupport}
            className="text-[#212121] hover:text-[#1565C0] transition-colors duration-200 font-medium px-2 py-1"
          >
            Contact Support
          </Link>

          {/* Conditional Login/Logout */}
          {userRole !== "" || deptRole !=="" ? (
            <div className="flex items-center space-x-4 ml-4">
              <ProfileDropDown />
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full bg-[#E0E0E0] text-[#212121] font-semibold hover:bg-gray-400 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3 ml-4">
              <Link
                to={routes.userLogin}
                className="px-5 py-2 rounded-full bg-[#FF9800] text-white font-semibold hover:bg-orange-600 transition-colors duration-200"
              >
                User Login
              </Link>
              <Link
                to={routes.deptLogin}
                className="px-5 py-2 rounded-full bg-[#1565C0] text-white font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Department Login
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden border rounded-lg p-2 text-lg bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden flex flex-col space-y-4 px-6 py-5 bg-[#F5F5F5] border-t shadow-inner">
          <Link
            to={routes.aboutUs}
            className="text-[#212121] hover:text-[#1565C0] transition-colors duration-200 font-medium py-2"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            to={routes.departmentWorks}
            className="text-[#212121] hover:text-[#1565C0] transition-colors duration-200 font-medium py-2"
            onClick={() => setIsOpen(false)}
          >
            View Department Works
          </Link>
          <Link
            to={routes.departmentInfo}
            className="text-[#212121] hover:text-[#1565C0] transition-colors duration-200 font-medium py-2"
            onClick={() => setIsOpen(false)}
          >
            View Department Info
          </Link>
          <Link
            to={routes.contactSupport}
            className="text-[#212121] hover:text-[#1565C0] transition-colors duration-200 font-medium py-2"
            onClick={() => setIsOpen(false)}
          >
            Contact Support
          </Link>

          {/* Conditional Login/Logout (Mobile) */}
          {isAuthenticated ? (
            <div className="flex flex-col space-y-3 pt-3 border-t">
              <ProfileDropDown />
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full bg-[#E0E0E0] text-[#212121] font-semibold hover:bg-gray-400 transition-colors duration-200 text-center"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-3 pt-3 border-t">
              <Link
                to={routes.userLogin}
                className="px-5 py-2 rounded-full bg-[#FF9800] text-white font-semibold hover:bg-orange-600 transition-colors duration-200 text-center"
                onClick={() => setIsOpen(false)}
              >
                User Login
              </Link>
              <NavLink
                to={routes.deptLogin}
                className="px-5 py-2 rounded-full bg-[#1565C0] text-white font-semibold hover:bg-blue-700 transition-colors duration-200 text-center"
                onClick={() => setIsOpen(false)}
              >
                Department Login
              </NavLink>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
