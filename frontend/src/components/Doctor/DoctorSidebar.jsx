import React from "react";
import { FaSignOutAlt, FaCalendarAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";

const DoctorSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/doctor" className="text-2xl font-medium">
          HealthConnect
        </Link>
      </div>
      <h2 className="text-xl font-medium mb-6 text-center">Doctor Dashboard</h2>

      <nav className="flex flex-col space-y-2">
        <button
          onClick={() => navigate("/doctor")}
          className="bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2 hover:bg-gray-600"
        >
          <FaCalendarAlt />
          <span>My Appointments</span>
        </button>
        <button
          onClick={() => navigate("/doctor/summary")}
          className="bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2 hover:bg-gray-600"
        >
          <FaCalendarAlt />
          <span>Summary</span>
        </button>
      </nav>
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DoctorSidebar;
