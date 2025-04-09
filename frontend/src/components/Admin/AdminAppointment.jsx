import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

// Component for displaying and managing a single appointment
const AdminAppointment = ({ appointment, onUpdateStatus }) => {
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Designer Purple-Blue Shading for Status Badges
  const statusColors = {
    scheduled: 'bg-gradient-to-br from-blue-300 to-indigo-300 text-blue-800',
    confirmed: 'bg-gradient-to-br from-green-300 to-teal-300 text-green-800',
    completed: 'bg-gradient-to-br from-purple-300 to-pink-300 text-purple-800',
    rejected: 'bg-gradient-to-br from-red-300 to-orange-300 text-red-800',
    pending: 'bg-gradient-to-br from-yellow-300 to-amber-300 text-yellow-800',
  };

  // Handle status updates
  const handleStatusUpdate = (newStatus) => {
    toast.success(`Appointment ${newStatus} successfully!`);
    onUpdateStatus(appointment._id, newStatus);
  };

  // Designer Purple-Blue Action Buttons
  const renderActionButtons = () => {
    switch (appointment.status.toLowerCase()) {
      case 'confirmed':
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => handleStatusUpdate('completed')}
              className="px-4 py-2 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 text-sm shadow-md transition duration-200 ease-in-out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Complete
            </button>
          </div>
        );
      case 'completed':
      case 'rejected':
        return null;
      default:
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => handleStatusUpdate('confirmed')}
              className="px-4 py-2 bg-gradient-to-br from-green-600 to-blue-600 text-white rounded-md hover:from-green-700 hover:to-blue-700 text-sm shadow-md transition duration-200 ease-in-out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Confirm
            </button>
            <button
              onClick={() => handleStatusUpdate('rejected')}
              className="px-4 py-2 bg-gradient-to-br from-red-600 to-purple-600 text-white rounded-md hover:from-red-700 hover:to-purple-700 text-sm shadow-md transition duration-200 ease-in-out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Reject
            </button>
          </div>
        );
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-purple-200 to-blue-200 rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 flex flex-col">
      {/* Header Section with Designer Gradient */}
      <div className="bg-gradient-to-r from-indigo-400 to-blue-500 p-4 border-b border-gray-300 flex items-center justify-between text-white">
        <h3 className="font-bold text-lg ">
          {appointment.doctor_id.user_id.name}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[appointment.status.toLowerCase()] || 'bg-gray-200 text-gray-800'}`}>
          {appointment.status}
        </span>
      </div>

      {/* Body Section */}
      <div className="p-6 flex-grow bg-white">
        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Patient Information</h4>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 flex items-center justify-center text-blue-700 font-bold mr-3">
              {appointment.user_id.name ? appointment.user_id.name.charAt(0) : 'U'}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{appointment.user_id.name || 'Patient Name'}</p>
              <p className="text-xs text-gray-500">Email: {appointment.user_id.email}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Doctor Information</h4>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-200 to-teal-200 flex items-center justify-center text-green-700 font-bold mr-3">
              {appointment.doctor_id.user_id.name ? appointment.doctor_id.user_id.name.charAt(0) : 'D'}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{appointment.doctor_id.user_id.name || 'Dr. Smith'}</p>
              <p className="text-xs text-gray-500">Qualification: {appointment.doctor_id.qualification}</p>
              <p className="text-xs text-gray-500">Description: {appointment.doctor_id.description.substring(0, 50)}...</p>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Date & Time</h4>
            <div className="flex items-center text-sm text-gray-700">
              <svg className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(appointment.date)}
            </div>
            <div className="flex items-center text-sm text-gray-700 mt-1">
              <svg className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {appointment.time}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Reason</h4>
            <p className="text-sm text-gray-700 bg-blue-50 bg-opacity-50 p-2 rounded">{appointment.reason.substring(0, 60)}...</p>
          </div>
        </div>

        {appointment.accepted_by && (
          <p className="text-xs text-gray-500 mb-2">
            Accepted By: <span className="font-medium text-indigo-600">{appointment.accepted_by}</span>
          </p>
        )}
      </div>

      {/* Footer Section with Designer Gradient */}
      <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-b-lg">
        {renderActionButtons()}
      </div>
    </div>
  );
};

// Main component that renders a list of appointments
const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/appointment/all');
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:9000/api/appointment/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus, accepted_by: "admin" }),
      });
      if (!response.ok) {
        throw new Error('Failed to update appointment status');
      }
      const data = await response.json();
      console.log(data.message);
      setAppointments(appointments.map(app =>
        app._id === appointmentId ? { ...app, status: newStatus } : app
      ));
    } catch (error) {
      console.error('Error updating status:', error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 text-white bg-clip-text text-transparent">Appointment Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
        {appointments.map(appointment => (
          <AdminAppointment
            key={appointment._id}
            appointment={appointment}
            onUpdateStatus={handleUpdateStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default AppointmentsList;