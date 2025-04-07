import { useEffect, useState } from 'react';
import { FaFileDownload, FaSpinner } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';
import { useSelector } from 'react-redux';
applyPlugin(jsPDF);

const AppointmentSummary = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [singlePdfGenerating, setSinglePdfGenerating] = useState(false);
  const [currentPdfId, setCurrentPdfId] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchAppointmentData();
  }, []);

  const fetchAppointmentData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:9000/api/appointment/doc/${user._id}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching appointments: ${response.status}`);
      }
      
      const data = await response.json();
      const sortedAppointments = data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
      setAppointments(sortedAppointments);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  // Generate PDF for a single appointment
  const generateAppointmentPDF = async (appointment) => {
    try {
      setSinglePdfGenerating(true);
      setCurrentPdfId(appointment._id);
      
      console.log('Generating PDF for appointment:', appointment._id);
      
      // Create new jsPDF instance
      const doc = new jsPDF();
      
      // Add logo and header
      doc.setFontSize(22);
      doc.setTextColor(33, 37, 41);
      doc.text('PetConnect', 20, 20);
      
      doc.setFontSize(16);
      doc.text('Appointment Confirmation', 20, 30);
      
      // Appointment details
      doc.setFontSize(12);
      doc.setTextColor(73, 80, 87);
      
      const shortId = appointment._id.substring(0, 8);
      doc.text(`Appointment ID: ${shortId}...`, 20, 45);
      doc.text(`Date: ${formatDate(appointment.date)}`, 20, 52);
      doc.text(`Time: ${appointment.time || 'N/A'}`, 20, 59);
      
      // Status
      doc.setFont(undefined, 'bold');
      const statusColor = appointment.status === 'completed' ? [40, 167, 69] : 
                        appointment.status === 'scheduled' ? [0, 123, 255] : 
                        appointment.status === 'cancelled' ? [220, 53, 69] : [73, 80, 87];
      doc.setTextColor(...statusColor);
      doc.text(`Status: ${appointment.status ? appointment.status.toUpperCase() : 'N/A'}`, 20, 66);
      
      doc.setFont(undefined, 'normal');
      doc.setTextColor(73, 80, 87);
      
      // Patient and doctor information
      doc.setFont(undefined, 'bold');
      doc.text('Patient Information:', 20, 80);
      doc.setFont(undefined, 'normal');
      
      const patientName = appointment.user_id && appointment.user_id.name ? appointment.user_id.name : 'N/A';
      const patientEmail = appointment.user_id && appointment.user_id.email ? appointment.user_id.email : 'N/A';
      
      doc.text(`Name: ${patientName}`, 20, 87);
      doc.text(`Email: ${patientEmail}`, 20, 94);
      
      doc.setFont(undefined, 'bold');
      doc.text('Doctor Information:', 20, 108);
      doc.setFont(undefined, 'normal');
      
      const doctorName = appointment.doctor_id && appointment.doctor_id.user_id && appointment.doctor_id.user_id.name 
        ? appointment.doctor_id.user_id.name 
        : 'N/A';
      const doctorQualification = appointment.doctor_id && appointment.doctor_id.qualification 
        ? appointment.doctor_id.qualification 
        : 'N/A';
      const doctorFees = appointment.doctor_id && appointment.doctor_id.fees 
        ? `$${appointment.doctor_id.fees.toFixed(2)}` 
        : 'N/A';
      
      doc.text(`Name: ${doctorName}`, 20, 115);
      doc.text(`Qualification: ${doctorQualification}`, 20, 122);
      doc.text(`Consultation Fee: ${doctorFees}`, 20, 129);
      
      // Appointment reason
      doc.setFont(undefined, 'bold');
      doc.text('Reason for Visit:', 20, 143);
      doc.setFont(undefined, 'normal');
      doc.text(appointment.reason || 'No reason provided', 20, 150);
      
      // Footer
      doc.setTextColor(73, 80, 87);
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text('Thank you for choosing PetConnect for your pet healthcare needs!', 55, 270);
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 85, 275);
      
      console.log('PDF generated, attempting to save...');
      
      // Save the PDF
      doc.save(`PetConnect-Appointment-${shortId}.pdf`);
      
      console.log('PDF saved successfully');
      setSinglePdfGenerating(false);
      setCurrentPdfId(null);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF: ' + error.message);
      setSinglePdfGenerating(false);
      setCurrentPdfId(null);
    }
  };

  // Generate PDF for last 5 appointments
  const generateAppointmentsSummaryPDF = async () => {
    try {
      setGeneratingPdf(true);
      console.log('Generating summary PDF for appointments');
      
      // Create new jsPDF instance
      const doc = new jsPDF();
      
      // Add logo and header
      doc.setFontSize(22);
      doc.setTextColor(33, 37, 41);
      doc.text('PetConnect', 20, 20);
      
      doc.setFontSize(16);
      doc.text('Appointments Summary Report', 20, 30);
      
      // Report details
      doc.setFontSize(12);
      doc.setTextColor(73, 80, 87);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 40);
      doc.text(`Total Appointments: ${appointments.length}`, 20, 47);
      
      // Calculate statistics
      const scheduledAppointments = appointments.filter(appt => appt.status === 'scheduled').length;
      const completedAppointments = appointments.filter(appt => appt.status === 'completed').length;
      const cancelledAppointments = appointments.filter(appt => appt.status === 'cancelled').length;
      
      doc.text(`Scheduled Appointments: ${scheduledAppointments}`, 20, 54);
      doc.text(`Completed Appointments: ${completedAppointments}`, 20, 61);
      doc.text(`Cancelled Appointments: ${cancelledAppointments}`, 20, 68);
      
      // Create appointments table
      const tableColumn = ["Date", "Time", "Patient", "Doctor", "Status", "Reason"];
      const tableRows = appointments.map(appointment => {
        return [
          formatDate(appointment.date),
          appointment.time || 'N/A',
          appointment.user_id && appointment.user_id.name ? appointment.user_id.name : 'N/A',
          appointment.doctor_id && appointment.doctor_id.user_id && appointment.doctor_id.user_id.name ? 
            appointment.doctor_id.user_id.name : 'N/A',
          (appointment.status || 'N/A').toUpperCase(),
          appointment.reason ? (appointment.reason.length > 15 ? appointment.reason.substring(0, 15) + '...' : appointment.reason) : 'N/A'
        ];
      });
      
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 75,
        styles: { fontSize: 10 },
        columnStyles: {
          0: { cellWidth: 30 },
          1: { cellWidth: 25 },
          2: { cellWidth: 30 },
          3: { cellWidth: 30 },
          4: { cellWidth: 25, halign: 'center' },
          5: { cellWidth: 40 }
        },
        headStyles: {
          fillColor: [73, 80, 87],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        didParseCell: function(data) {
          // Color the status cell based on value
          if (data.column.index === 4) {
            if (data.cell.raw === 'COMPLETED') {
              data.cell.styles.textColor = [40, 167, 69]; // green
            } else if (data.cell.raw === 'SCHEDULED') {
              data.cell.styles.textColor = [0, 123, 255]; // blue
            } else if (data.cell.raw === 'CANCELLED') {
              data.cell.styles.textColor = [220, 53, 69]; // red
            }
          }
        }
      });
      
      // Footer
      doc.setTextColor(73, 80, 87);
      doc.setFontSize(10);
      doc.text('PetConnect - Confidential Document', 85, 270);
      
      console.log('Summary PDF generated, attempting to save...');
      
      // Save the PDF
      doc.save(`PetConnect-Appointments-Summary.pdf`);
      
      console.log('Summary PDF saved successfully');
      setGeneratingPdf(false);
    } catch (error) {
      console.error('Error generating appointments summary PDF:', error);
      alert('Error generating summary PDF: ' + error.message);
      setGeneratingPdf(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) return <p className="text-red-500 p-6">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointment Summary</h1>
        <button
          onClick={generateAppointmentsSummaryPDF}
          disabled={generatingPdf}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
        >
          {generatingPdf ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <FaFileDownload className="mr-2" />
              Download Past 5 Appointments
            </>
          )}
        </button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {appointment._id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(appointment.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.time || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.user_id && appointment.user_id.name ? appointment.user_id.name : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.doctor_id && appointment.doctor_id.user_id && appointment.doctor_id.user_id.name ? 
                        appointment.doctor_id.user_id.name : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : appointment.status === 'scheduled' 
                            ? 'bg-blue-100 text-blue-800'
                            : appointment.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                      }`}>
                        {(appointment.status || 'N/A').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => generateAppointmentPDF(appointment)}
                        disabled={singlePdfGenerating && currentPdfId === appointment._id}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center"
                      >
                        {singlePdfGenerating && currentPdfId === appointment._id ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <FaFileDownload className="mr-2" />
                            Download PDF
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSummary;