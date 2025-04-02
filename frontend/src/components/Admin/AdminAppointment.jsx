import React from 'react';

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

  // Status badge color mapping
  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-purple-100 text-purple-800',
    rejected: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  // Handle status updates
  const handleStatusUpdate = (newStatus) => {
    onUpdateStatus(appointment._id, newStatus);
  };

  // Determine which action buttons to show based on current status
  const renderActionButtons = () => {
    switch(appointment.status.toLowerCase()) {
      case 'confirmed':
        return (
          <button 
            onClick={() => handleStatusUpdate('completed')}
            className="px-3 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
          >
            Complete
          </button>
        );
      case 'completed':
      case 'rejected':
        return null; // No actions for completed or rejected appointments
      default: // For pending, scheduled, or any other status
        return (
          <>
            <button 
              onClick={() => handleStatusUpdate('confirmed')}
              className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            >
              Confirm
            </button>
            <button 
              onClick={() => handleStatusUpdate('rejected')}
              className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-sm ml-2"
            >
              Reject
            </button>
          </>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-800">
            Appointment {appointment._id.substring(0, 8)}...
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[appointment.status.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}>
            {appointment.status}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Created: {new Date(appointment.createdAt).toLocaleString()}
        </p>
      </div>
      
      {/* Card Body */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</h4>
              <div className="flex items-center mt-1">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {appointment.user?.name ? appointment.user.name.charAt(0) : 'U'}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{appointment.user?.name || 'Patient Name'}</p>
                  <p className="text-xs text-gray-500">ID: {appointment.user_id.substring(0, 10)}...</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</h4>
              <div className="flex items-center mt-1">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                  {appointment.doctor?.name ? appointment.doctor.name.charAt(0) : 'D'}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{appointment.doctor?.name || 'Dr. Smith'}</p>
                  <p className="text-xs text-gray-500">ID: {appointment.doctor_id.substring(0, 10)}...</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</h4>
              <div className="mt-1">
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-700">{formatDate(appointment.date)}</span>
                </div>
                <div className="flex items-center mt-1">
                  <svg className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-700">{appointment.time}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</h4>
              <p className="mt-1 text-sm text-gray-700 bg-gray-50 p-2 rounded">
                {appointment.reason}
              </p>
            </div>
          </div>
        </div>

        {/* Card Footer - Actions */}
        <div className="flex justify-end space-x-2 mt-6">
          {renderActionButtons()}
        </div>
      </div>
    </div>
  );
};

// Main component that renders a list of appointments
const AppointmentsList = () => {
  // Sample dummy data
  const [appointments, setAppointments] = React.useState([
    {
      _id: "60d21b4667d0d8992e610c85",
      user_id: "60d21b4667d0d8992e610c80",
      doctor_id: "60d21b4667d0d8992e610c81",
      date: "2025-04-15T00:00:00.000Z",
      time: "10:30",
      reason: "Annual checkup and blood work",
      status: "scheduled",
      createdAt: "2025-03-30T12:34:56.789Z",
      updatedAt: "2025-03-30T12:34:56.789Z",
      user: { name: "John Doe" },
      doctor: { name: "Dr. Sarah Johnson" }
    },
    {
      _id: "60d21b4667d0d8992e610c86",
      user_id: "60d21b4667d0d8992e610c82",
      doctor_id: "60d21b4667d0d8992e610c83",
      date: "2025-04-10T00:00:00.000Z",
      time: "14:15",
      reason: "Persistent headache and dizziness for past week",
      status: "scheduled",
      createdAt: "2025-03-28T09:15:22.345Z",
      updatedAt: "2025-03-28T09:15:22.345Z",
      user: { name: "Emily Wilson" },
      doctor: { name: "Dr. Michael Chen" }
    },
    {
      _id: "60d21b4667d0d8992e610c87",
      user_id: "60d21b4667d0d8992e610c84",
      doctor_id: "60d21b4667d0d8992e610c81",
      date: "2025-04-03T00:00:00.000Z",
      time: "09:00",
      reason: "Follow-up appointment for recent surgery",
      status: "scheduled",
      createdAt: "2025-03-25T16:48:37.123Z",
      updatedAt: "2025-04-03T10:15:00.000Z",
      user: { name: "Robert Smith" },
      doctor: { name: "Dr. Sarah Johnson" }
    }
  ]);

  // Update appointment status handler
  const handleUpdateStatus = (appointmentId, newStatus) => {
    setAppointments(appointments.map(app => 
      app._id === appointmentId ? {...app, status: newStatus} : app
    ));
    // Here you would also make an API call to update the appointment status in the database
    console.log(`Appointment ${appointmentId} status updated to ${newStatus}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Appointment Management</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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