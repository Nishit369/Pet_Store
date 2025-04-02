import React from 'react';
import { FaCalendarAlt, FaClock, FaUserMd, FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaStethoscope, FaTrashAlt } from 'react-icons/fa';

export default function ScheduleCard({ appointment, onDelete }) {
  const appointmentData = Array.isArray(appointment) ? appointment[0] : appointment;
  
  const { 
    _id, 
    date, 
    time, 
    status, 
    reason,
    doctor_id: doctor 
  } = appointmentData || {
    _id: "temp-id",
    date: new Date("2025-04-05"),
    time: "10:00 AM",
    status: "confirmed",
    reason: "Routine Checkup",
    doctor_id: {
      name: "Dr. Michael Brown",
      qualification: "MBBS, MS",
      fees: 180
    }
  };
  
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
  
  // Status styling
  const getStatusInfo = () => {
    switch(status.toLowerCase()) {
      case 'confirmed':
        return { 
          icon: <FaCheckCircle className="h-5 w-5 text-green-500" />,
          text: 'Confirmed',
          color: 'bg-green-100 text-green-800'
        };
      case 'cancelled':
        return { 
          icon: <FaTimesCircle className="h-5 w-5 text-red-500" />,
          text: 'Cancelled',
          color: 'bg-red-100 text-red-800'
        };
      default:
        return { 
          icon: <FaExclamationCircle className="h-5 w-5 text-yellow-500" />,
          text: 'Pending',
          color: 'bg-yellow-100 text-yellow-800'
        };
    }
  };
  
  const statusInfo = getStatusInfo();
  
  const handleDelete = async () => {
    if (_id) {
      try {
        const response = await fetch(`http://localhost:9000/api/appointment/${_id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          onDelete(_id);
        } else {
          console.error('Failed to delete appointment');
        }
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };
  
  return (
    <div className="max-w-md rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100">
      {/* Top color bar - different color based on status */}
      <div className={`h-2 ${status.toLowerCase() === 'confirmed' ? 'bg-green-500' : status.toLowerCase() === 'cancelled' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
      
      <div className="p-6">
        {/* Status badge */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Appointment</h2>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${statusInfo.color}`}>
            {statusInfo.icon}
            <span className="ml-1">{statusInfo.text}</span>
          </span>
        </div>
        
        {/* Doctor info */}
        <div className="flex items-start mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <FaUserMd className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Doctor</p>
            <p className="text-md font-medium text-gray-800">{doctor.name}</p>
            <p className="text-sm text-gray-600">{doctor.qualification}</p>
            <p className="text-sm font-medium text-gray-700 mt-1">${doctor.fees}</p>
          </div>
        </div>
        
        {/* Appointment reason */}
        <div className="flex items-start mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <FaStethoscope className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Reason</p>
            <p className="text-md font-medium text-gray-800">{reason}</p>
          </div>
        </div>
        
        {/* Date and time */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center">
            <FaCalendarAlt className="h-5 w-5 text-gray-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="text-md font-medium text-gray-800">{formattedDate}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaClock className="h-5 w-5 text-gray-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="text-md font-medium text-gray-800">{time}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom action - single Delete button */}
      <div className="px-6 py-4 bg-gray-50 flex justify-center items-center">
        <button 
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md flex items-center hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <FaTrashAlt className="h-4 w-4 mr-2" />
          Delete Appointment
        </button>
      </div>
    </div>
  );
}
