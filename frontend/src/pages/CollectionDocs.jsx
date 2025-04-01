import React from "react";

const doctors = [
  { name: "Dr. Richard James", specialty: "General physician", available: true },
  // ...add other doctors here...
];

const CollectionDocs = () => {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Browse through the doctors specialist.
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          style={{
            padding: "10px 15px",
            border: "none",
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          General physician
        </button>
        <button
          style={{
            padding: "10px 15px",
            border: "none",
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Gynecologist
        </button>
        <button
          style={{
            padding: "10px 15px",
            border: "none",
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Dermatologist
        </button>
        <button
          style={{
            padding: "10px 15px",
            border: "none",
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Pediatricians
        </button>
        <button
          style={{
            padding: "10px 15px",
            border: "none",
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Neurologist
        </button>
        <button
          style={{
            padding: "10px 15px",
            border: "none",
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Gastroenterologist
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {doctors.map((doctor, index) => (
          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            key={index}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div
              style={{
                width: "100%",
                height: "150px",
                backgroundColor: "#f0f0f0",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            ></div>
            <h3>{doctor.name}</h3>
            <p>{doctor.specialty}</p>
            {doctor.available && (
              <span
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  padding: "5px 10px",
                  backgroundColor: "#28a745",
                  color: "white",
                  borderRadius: "5px",
                  fontSize: "12px",
                }}
              >
                Available
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionDocs;
