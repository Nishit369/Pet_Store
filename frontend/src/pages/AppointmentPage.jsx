import React, { useState,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { useSelector } from "react-redux";

const AppointmentPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [hoveredSlot, setHoveredSlot] = useState(null);
  const [hoveredDoctor, setHoveredDoctor] = useState(null);
  const [doctor,setDoctor] = useState({})
  const { user } = useSelector((state) => state.auth);
  const {id} = useParams()
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/doctor/${id}`);
        const data = await response.json()
        setDoctor(data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };
    fetchDoctor();
  }, [id]);
  const handleDoctorClick = () => {
    navigate("/appointment"); 
  };

  const styles = {
    appointmentPage: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    responsiveSection: {
      marginBottom: "20px",
    },
    doctorDetails: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
      backgroundColor: "#f9f9f9",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    doctorImage: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      overflow: "hidden",
      border: "2px solid #007BFF",
    },
    doctorInfo: {
      flex: 1,
    },
    verifiedBadge: {
      color: "green",
      marginLeft: "5px",
    },
    about: {
      marginTop: "10px",
      color: "#555",
    },
    appointmentFee: {
      marginTop: "10px",
      fontWeight: "bold",
    },
    bookingSlots: {
      textAlign: "center",
      backgroundColor: "#f9f9f9",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    responsiveGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
      gap: "15px",
      marginTop: "15px",
    },
    selected: {
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "1px solid #0056b3",
      borderRadius: "5px",
    },
    bookAppointment: {
      marginTop: "20px",
      padding: "15px 30px",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "30px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      transition: "background-color 0.3s",
    },
    bookAppointmentHover: {
      backgroundColor: "#0056b3",
    },
    button: {
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "20px",
      backgroundColor: "#fff",
      cursor: "pointer",
      transition: "background-color 0.3s, transform 0.2s",
      fontSize: "14px",
      fontWeight: "bold",
    },
    buttonHover: {
      backgroundColor: "#007BFF",
      color: "#fff",
      transform: "scale(1.05)",
    },
    relatedDoctors: {
      textAlign: "center",
      marginTop: "40px",
    },
    doctorCards: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    doctorCard: {
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "20px",
      cursor: "pointer",
      textAlign: "center",
      transition: "transform 0.2s, box-shadow 0.2s",
      backgroundColor: "#fff",
    },
    doctorCardHover: {
      transform: "scale(1.05)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    doctorCardImage: {
      width: "100px",
      height: "100px",
      margin: "0 auto",
      borderRadius: "50%",
      overflow: "hidden",
    },
    availability: {
      color: "green",
    },
  };

  return (
    <div style={styles.appointmentPage}>
      <div style={{ ...styles.doctorDetails, ...styles.responsiveSection }}>
        <div style={styles.doctorImage}>
          <img src="" alt="Doctor" style={{ width: "100%", height: "100%" }} />
        </div>
        <div style={styles.doctorInfo}>
          <h1>
            {doctor.name} <span style={styles.verifiedBadge}>✔</span>
          </h1>
          <p>
            {doctor.qualification} <span>2 Years</span>
          </p>
          <p style={styles.about}>
            {doctor.description}
          
          </p>
          <p style={styles.appointmentFee}>
            Appointment fee: <strong>${doctor.fees}</strong>
          </p>
        </div>
      </div>

      <div style={{ ...styles.bookingSlots, ...styles.responsiveSection }}>
        <h2>Booking slots</h2>
        <div style={styles.responsiveGrid}>
          <button
            style={{ ...styles.button, ...(hoveredSlot === "MON" ? styles.buttonHover : {}) }}
            onMouseEnter={() => setHoveredSlot("MON")}
            onMouseLeave={() => setHoveredSlot(null)}
          >
            MON<br />10
          </button>
          <button
            style={{ ...styles.button, ...(hoveredSlot === "TUE" ? styles.buttonHover : {}) }}
            onMouseEnter={() => setHoveredSlot("TUE")}
            onMouseLeave={() => setHoveredSlot(null)}
          >
            TUE<br />11
          </button>
          <button
            style={{ ...styles.button, ...(hoveredSlot === "WED" ? styles.buttonHover : {}) }}
            onMouseEnter={() => setHoveredSlot("WED")}
            onMouseLeave={() => setHoveredSlot(null)}
          >
            WED<br />12
          </button>
          <button
            style={{ ...styles.button, ...(hoveredSlot === "THU" ? styles.buttonHover : {}) }}
            onMouseEnter={() => setHoveredSlot("THU")}
            onMouseLeave={() => setHoveredSlot(null)}
          >
            THU<br />13
          </button>
          <button
            style={{ ...styles.button, ...(hoveredSlot === "FRI" ? styles.buttonHover : {}) }}
            onMouseEnter={() => setHoveredSlot("FRI")}
            onMouseLeave={() => setHoveredSlot(null)}
          >
            FRI<br />14
          </button>
          <button
            style={{ ...styles.button, ...(hoveredSlot === "SAT" ? styles.buttonHover : {}) }}
            onMouseEnter={() => setHoveredSlot("SAT")}
            onMouseLeave={() => setHoveredSlot(null)}
          >
            SAT<br />15
          </button>
          <button
            style={{ ...styles.button, ...(hoveredSlot === "SUN" ? styles.buttonHover : {}) }}
            onMouseEnter={() => setHoveredSlot("SUN")}
            onMouseLeave={() => setHoveredSlot(null)}
          >
            SUN<br />16
          </button>
        </div>
        <div style={styles.responsiveGrid}>
          <button
            style={{ ...styles.button, ...(hoveredSlot === "8:00 am" ? styles.buttonHover : {}) }}
            onMouseEnter={() => setHoveredSlot("8:00 am")}
            onMouseLeave={() => setHoveredSlot(null)}
          >
            8:00 am
          </button>
          <button
            style={{ ...styles.button, ...(hoveredSlot === "8:30 am" ? styles.buttonHover : {}) }}
            onMouseEnter={() => setHoveredSlot("8:30 am")}
            onMouseLeave={() => setHoveredSlot(null)}
          >
            8:30 am
          </button>
          <button
            style={{ ...styles.button, ...(hoveredSlot === "9:00 am" ? styles.buttonHover : {}) }}
            onMouseEnter={() => setHoveredSlot("9:00 am")}
            onMouseLeave={() => setHoveredSlot(null)}
          >
            9:00 am
          </button>
          <button
            style={{ ...styles.button, ...(hoveredSlot === "9:30 am" ? styles.buttonHover : {}) }}
            onMouseEnter={() => setHoveredSlot("9:30 am")}
            onMouseLeave={() => setHoveredSlot(null)}
          >
            9:30 am
          </button>
          <button
            style={{ ...styles.button, ...(hoveredSlot === "10:00 am" ? styles.buttonHover : {}) }}
            onMouseEnter={() => setHoveredSlot("10:00 am")}
            onMouseLeave={() => setHoveredSlot(null)}
          >
            10:00 am
          </button>
          <button
            style={{ ...styles.button, ...(hoveredSlot === "10:30 am" ? styles.buttonHover : {}) }}
            onMouseEnter={() => setHoveredSlot("10:30 am")}
            onMouseLeave={() => setHoveredSlot(null)}
          >
            10:30 am
          </button>
          <button
            style={{ ...styles.button, ...(hoveredSlot === "11:00 am" ? styles.buttonHover : {}) }}
            onMouseEnter={() => setHoveredSlot("11:00 am")}
            onMouseLeave={() => setHoveredSlot(null)}
          >
            11:00 am
          </button>
          <button
            style={{ ...styles.button, ...(hoveredSlot === "11:30 am" ? styles.buttonHover : {}) }}
            onMouseEnter={() => setHoveredSlot("11:30 am")}
            onMouseLeave={() => setHoveredSlot(null)}
          >
            11:30 am
          </button>
        </div>
        <button
          style={{
            ...styles.bookAppointment,
            ...(hoveredSlot === "book" ? styles.bookAppointmentHover : {}),
          }}
          onMouseEnter={() => setHoveredSlot("book")}
          onMouseLeave={() => setHoveredSlot(null)}
        >
          Book an appointment
        </button>
      </div>

      <div style={{ ...styles.relatedDoctors, ...styles.responsiveSection }}>
        <h2>Related Doctors</h2>
        <p>Simply browse through our extensive list of trusted doctors.</p>
        <div style={styles.doctorCards}>
          {[...Array(5)].map((_, index) => (
            <div
              style={{
                ...styles.doctorCard,
                ...(hoveredDoctor === index ? styles.doctorCardHover : {}),
              }}
              key={index}
              onMouseEnter={() => setHoveredDoctor(index)}
              onMouseLeave={() => setHoveredDoctor(null)}
              onClick={handleDoctorClick}
            >
              <div style={styles.doctorCardImage}>
                <img src="" alt="Doctor" style={{ width: "100%", height: "100%" }} />
              </div>
              <div>
                <p style={styles.availability}>● Available</p>
                <h3>Dr. Richard James</h3>
                <p>General physician</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
