import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

// Component for displaying and managing a single appointment
const DoctorAppointment = ({ appointment, onUpdateStatus }) => {
  console.log(appointment)
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
          Appointment #{appointment._id.substring(appointment._id.length - 5)}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[appointment.status.toLowerCase()] || 'bg-gray-200 text-gray-800'}`}>
          {appointment.status}
        </span>
      </div>

      {/* Body Section */}
      <div className="p-6 flex-grow bg-white">
        <div className="space-y-4">
          {/* Patient Information */}
          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Patient</h4>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 flex items-center justify-center text-blue-700 font-bold mr-3">
                {appointment.user_id.name ? appointment.user_id.name.charAt(0) : 'U'}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{appointment.user_id.name || 'Patient Name'}</p>
                <p className="text-xs text-gray-500">Email: {appointment.user_id.email}</p>
                <p className="text-xs font-bold text-gray-500">Accepted By: {appointment.accepted_by || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Schedule Information */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</h4>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-700 font-medium">{formatDate(appointment.date)}</span>
                </div>
                <div className="flex items-center mt-2">
                  <svg className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-700">{appointment.time}</span>
                </div>
              </div>
            </div>

            {/* Reason for Visit */}
            <div className="flex-1 min-w-[200px]">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Reason for Visit</h4>
              <p className="mt-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg min-h-[70px]">
                {appointment.reason || 'No reason provided'}
              </p>
            </div>
          </div>

          {/* Notes section - Optional */}
          {appointment.notes && (
            <div>
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor's Notes</h4>
              <p className="mt-1 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                {appointment.notes}
              </p>
            </div>
          )}
        </div>

        {/* Card Footer - Actions */}
        <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-b-lg">
          {renderActionButtons()}
        </div>
      </div>
    </div>
  );
};

// Main component that renders a list of appointments for a specific doctor
const DoctorAppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchDoctorAppointments = async () => {
      setIsLoading(true);
      const doctorId = user._id;
      try {
        const response = await fetch(`http://localhost:9000/api/appointment/doc/${doctorId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error:', error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctorAppointments();
  }, [user._id]);

  // Update appointment status handler
  const handleUpdateStatus = async (appointmentId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:9000/api/appointment/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus, accepted_by: "doctor" }),
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
      toast.error('Failed to update appointment status');
    }
  };

  // For filtering appointments (optional feature)
  const [filter, setFilter] = useState('all');

  const filteredAppointments = filter === 'all'
    ? appointments
    : appointments.filter(app => app.status.toLowerCase() === filter);

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline"> {error}</span>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 text-white bg-clip-text text-transparent mb-4 sm:mb-0">
          Your Appointments
        </h1>

        {/* Optional filter controls */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Filter:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-10 rounded-lg text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'all' ? 'You have no appointments scheduled.' : `No ${filter} appointments found.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredAppointments.map(appointment => (
            <DoctorAppointment
              key={appointment._id}
              appointment={appointment}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointmentsList;