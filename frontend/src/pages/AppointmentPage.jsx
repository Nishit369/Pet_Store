import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { motion } from 'framer-motion';
import { TextField } from '@mui/material';

const AppointmentPage = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({});
  const { user } = useSelector((state) => state.auth);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState('');
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  
  // Dummy data for related doctors
  const relatedDoctors = [
    {
      id: 'dr1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      profileImage: null,
      rating: '4.9',
      fees: '60'
    },
    {
      id: 'dr2',
      name: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      profileImage: null,
      rating: '4.7',
      fees: '55'
    },
    {
      id: 'dr3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Dermatologist',
      profileImage: null,
      rating: '4.8',
      fees: '50'
    }
  ];
  
  const { id } = useParams();
  
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/doctor/${id}`);
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load doctor information. Please try again later.");
      }
    };
    fetchDoctor();
  }, [id]);
  
  const handleDoctorClick = (doctorId) => {
    navigate(`/appointment/${doctorId}`);
  };
  
  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time for your appointment");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Appointment data to be sent to the backend
      const appointmentData = {
        doctor_id: id,
        user_id: user?.id,
        date: selectedDate.format('YYYY-MM-DD'),
        time: selectedTime,
        status: 'scheduled'
      };
      
      // Send POST request to backend
      const response = await fetch('http://localhost:9000/api/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization token if required
          // 'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(appointmentData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to book appointment');
      }
      
      // Show success message
      setIsBookingConfirmed(true);
      setTimeout(() => {
        setIsBookingConfirmed(false);
        // Navigate to the confirmation page in a real app
        // navigate('/appointment-confirmation', { state: { appointment: data } });
      }, 3000);
    } catch (error) {
      console.error("Error booking appointment:", error);
      setError(error.message || "Failed to book appointment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Available time slots
  const timeSlots = [
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM'
  ];
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {isBookingConfirmed && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-5 left-0 right-0 mx-auto w-max z-50 bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg"
        >
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="font-semibold">Appointment booked successfully!</span>
          </div>
        </motion.div>
      )}
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-5 left-0 right-0 mx-auto w-max z-50 bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg"
        >
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="font-semibold">{error}</span>
            <button 
              onClick={() => setError(null)} 
              className="ml-2 text-white hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </motion.div>
      )}

      <div className="max-w-6xl mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
        >
          <div className="md:flex">
            <div className="md:flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 p-6 flex items-center justify-center">
              {doctor.profileImage ? (
                <img className="h-48 w-48 rounded-full border-4 border-white shadow-lg object-cover" src={doctor.profileImage} alt={doctor.name} />
              ) : (
                <div className="h-48 w-48 rounded-full border-4 border-white shadow-lg bg-gray-300 flex items-center justify-center">
                  <span className="text-4xl text-white font-bold">{doctor.name ? doctor.name.charAt(0) : 'D'}</span>
                </div>
              )}
            </div>
            <div className="p-8 w-full">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-gray-900">{doctor.name || 'Doctor'}</h1>
                    <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">Verified</span>
                  </div>
                  <p className="text-gray-600 mt-2">{doctor.qualification || 'Specialist'} • {doctor.experience || '2'} Years Experience</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600">Consultation Fee</p>
                  <p className="text-2xl font-bold text-blue-800">${doctor.fees || '50'}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900">About</h3>
                <p className="mt-2 text-gray-600">{doctor.description || 'A dedicated healthcare professional committed to providing the highest standard of patient care with a focus on preventative health and patient education.'}</p>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Specialty</p>
                  <p className="font-medium">{doctor.specialty || 'General Medicine'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Languages</p>
                  <p className="font-medium">{doctor.languages || 'English, Spanish'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Rating</p>
                  <div className="flex items-center">
                    <span className="font-medium">{doctor.rating || '4.8'}</span>
                    <svg className="w-4 h-4 text-yellow-500 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Patients</p>
                  <p className="font-medium">{doctor.patientCount || '1000'}+</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-8 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Book Your Appointment</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Select Date</h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Appointment Date"
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)}
                renderInput={(params) => <TextField {...params} fullWidth />}
                minDate={dayjs()}
                maxDate={dayjs().add(30, 'day')}
                disablePast
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#E5E7EB',
                      borderRadius: '0.5rem',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3B82F6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3B82F6',
                    },
                  },
                  width: '100%',
                  maxWidth: '400px'
                }}
              />
            </LocalizationProvider>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Select Time</h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {timeSlots.map((time, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 px-4 rounded-lg transition-all duration-200 ${
                    selectedTime === time
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  } font-medium`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleBookAppointment}
            disabled={isLoading || !selectedDate || !selectedTime}
            className={`w-full md:w-auto ${
              isLoading || !selectedDate || !selectedTime
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-1'
            } text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Book Appointment
              </>
            )}
          </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-2">Related Doctors</h2>
          <p className="text-gray-600 mb-6">Other specialists you might be interested in</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedDoctors.map((doc, index) => (
              <motion.div
                key={doc.id || index}
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-sm overflow-hidden cursor-pointer"
                onClick={() => handleDoctorClick(doc.id || index)}
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="mr-4">
                      {doc.profileImage ? (
                        <img className="h-16 w-16 rounded-full object-cover border-2 border-white shadow" src={doc.profileImage} alt={doc.name} />
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl border-2 border-white shadow">
                          {doc.name ? doc.name.charAt(0) : `D${index+1}`}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                        <span className="text-xs text-green-600 font-medium">Available Today</span>
                      </div>
                      <h3 className="font-bold text-gray-900">{doc.name}</h3>
                      <p className="text-sm text-gray-600">{doc.specialty}</p>
                      
                      <div className="flex items-center mt-3">
                        <div className="flex items-center mr-3">
                          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <span className="text-sm font-medium text-gray-700 ml-1">{doc.rating}</span>
                        </div>
                        <div className="text-sm text-gray-600">${doc.fees}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AppointmentPage;