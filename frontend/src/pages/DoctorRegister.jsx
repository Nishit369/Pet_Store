import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import register from "../assets/register.jpeg";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import "react-toastify/dist/ReactToastify.css";

const DoctorRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [qualification, setQualification] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [fees, setFees] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !qualification || !description || !fees) {
      toast.error("Please fill all required fields", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      // Create the user data object with all doctor fields
      const userData = {
        name,
        email,
        password,
        role: "doctor",
        qualification,
        description,
        address,
        fees: Number(fees)
      };
      
      // Dispatch the registerUser action
      const resultAction = await dispatch(registerUser(userData));
      
      // Check if the action was fulfilled
      if (registerUser.fulfilled.match(resultAction)) {
        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        setTimeout(() => {
          navigate("/doctor");
        }, 2000);
      } else {
        // If the action was rejected, the error will be handled by the useSelector above
        const errorMessage = resultAction.payload?.message || "Registration failed. Please try again.";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Show error toast when error state changes
  useEffect(() => {
    if (error) {
      toast.error(error.message || "Registration failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [error]);

  return (
    <div className="flex">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Doctor Registration</h2>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Qualification</label>
            <input
              type="text"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your Qualification"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Short description about yourself"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your Address"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Consultation Fees</label>
            <input
              type="number"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your consultation fees"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">Login</Link>
          </p>
        </form>
      </div>
      <div className="hidden md:block w-1/2">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={register}
            alt="Doctor Registration"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorRegister;