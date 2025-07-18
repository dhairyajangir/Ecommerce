import React, { useEffect, useState } from "react";
import AddressCard from "../components/auth/AddressCard";
import Nav from "../components/auth/nav";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify"; // For modern notifications
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function Profile() {
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    avatarUrl: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const email = useSelector((state) => state.user.email);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/v2/user/profile?email=${email}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (!data.user) throw new Error("User data not found");
      setPersonalDetails(data.user);
      setAddresses(data.addresses || []);
      toast.success("Profile loaded", { position: "top-right", autoClose: 2000 });
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError(err.message);
      toast.error("Failed to load profile. Please refresh.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleAddAddress = () => {
    navigate("/create-address");
  };

  // Default avatar URL
  const avatarUrl = personalDetails.avatarUrl
    ? `http://localhost:8000/${personalDetails.avatarUrl}`
    : "https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-black">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-black">
        <p className="text-lg font-medium text-rose-400">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Nav />
      {/* Modern profile container */}
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50 p-4 md:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Dark section for profile header (visual distinction) */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              My Profile
            </h1>
            <p className="text-blue-100 opacity-90 mt-2">
              Manage your account details and addresses
            </p>
          </div>

          {/* Profile section */}
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Personal Details
            </h2>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              {/* Profile picture with animated border */}
              <div className="group flex-shrink-0 w-40 h-40 rounded-full border-[3px] border-transparent hover:border-blue-400 transition-all duration-300 flex items-center justify-center overflow-hidden bg-blue-50">
                <img
                  src={avatarUrl}
                  alt="profile"
                  className="w-full h-full object-cover group-hover:ring-4 group-hover:ring-blue-100 transition-all duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg";
                  }}
                />
              </div>
              {/* Details grid */}
              <div className="grid gap-4 md:gap-6 flex-grow">
                <div className="p-4 rounded-xl shadow-sm bg-slate-50 hover:bg-blue-50 transition-all duration-200">
                  <div className="text-sm uppercase font-medium text-slate-500">
                    Name
                  </div>
                  <div className="text-xl font-medium text-slate-800 mt-1">
                    {personalDetails.name}
                  </div>
                </div>
                <div className="p-4 rounded-xl shadow-sm bg-slate-50 hover:bg-blue-50 transition-all duration-200">
                  <div className="text-sm uppercase font-medium text-slate-500">
                    Email
                  </div>
                  <div className="text-xl font-medium text-slate-800 mt-1 break-all">
                    {personalDetails.email}
                  </div>
                </div>
                <div className="p-4 rounded-xl shadow-sm bg-slate-50 hover:bg-blue-50 transition-all duration-200">
                  <div className="text-sm uppercase font-medium text-slate-500">
                    Mobile
                  </div>
                  <div className="text-xl font-medium text-slate-800 mt-1">
                    {personalDetails.phoneNumber}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Addresses section */}
          <div className="p-6 md:p-8 border-t border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-800">
                Saved Addresses
              </h2>
              <button
                onClick={handleAddAddress}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Address
              </button>
            </div>

            {/* Address list grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.length === 0 ? (
                <div className="col-span-full bg-slate-50 p-6 rounded-xl text-center text-slate-500">
                  <p className="text-lg">No saved addresses yet.</p>
                  <button
                    onClick={handleAddAddress}
                    className="text-blue-600 font-medium mt-2"
                  >
                    Add your first address
                  </button>
                </div>
              ) : null}
              {addresses.map((address, index) => (
                <AddressCard key={index} {...address} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
