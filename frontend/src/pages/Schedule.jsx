import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { FaSignOutAlt, FaCalendarCheck } from "react-icons/fa";
import ScheduleCard from '../components/schedule/ScheduleCard';

export default function SchedulePage() {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [appointments, setAppointments] = useState([]);
    
    useEffect(() => {
      if (!user) {
        navigate("/login");
      } else {
        fetch(`http://localhost:9000/api/appointment?id=${user._id}`)
          .then(response => response.json())
          .then(data => setAppointments(data))
          .catch(error => console.error("Error fetching appointments:", error));
      }
    }, [user, navigate]);
    
    const handleLogout = () => {
      dispatch(logout());
      dispatch(clearCart());
      navigate("/login");
    };
    
    const handleAppointments = () => {
      navigate("/schedule");
    };
  
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow container mx-auto p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
            {/* Left Section */}
            <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">
                {user?.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">{user?.email}</p>
              <div className="space-y-2">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center justify-center"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
                <button
                  onClick={handleAppointments}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center"
                >
                  <FaCalendarCheck className="mr-2" /> My Appointments
                </button>
              </div>
            </div>

            <div className="w-full md:w-2/3 lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {appointments.map((appointment) => (
                  <ScheduleCard  key={appointment.user_id} appointment={appointment}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
