import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa6";


const AdminPasswordResetPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const phone = query.get("phone");
  const [adminData, setAdminData] = useState<any>(null);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const getAdminData = async () => {
    try {
      const res = await axios.get(`/api/unverified_admin/${phone}`);

      if (res.data) {
        setAdminData(res.data);
      } else {
        toast.error("Phone number does not exist.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch admin data.");
    }
  };

  const handleResettingPassword = async () => {
    if (!password) {
      toast.error("Please enter a new password.");
      return;
    }

    try {
      const res = await axios.post("/api/admin_reset_password", {
        id: adminData._id,
        password: password,
      });

      if (res.data) {
        toast.success("Password reset successfully.");
        navigate("/login");
      } else {
        toast.error("Failed to reset password.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while resetting the password.");
    }
  };

  useEffect(() => {
    getAdminData();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-sky-500 mb-6">
          Reset Password
        </h2>
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium mb-2">
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-11 cursor-pointer text-gray-600"
          >
            {showPassword ? (
              <IoEyeOff />
            ) : (
             <FaEye />
            )}
          </span>
        </div>
        <button
          onClick={handleResettingPassword}
          className="w-full bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 transition duration-200"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default AdminPasswordResetPage;
