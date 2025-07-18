import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../components/auth/nav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify"; // For modern notifications (install: npm install react-toastify)
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/common/LoadingSpinner";

const CreateAddress = () => {
  const navigate = useNavigate();
  const email = useSelector((state) => state.user.email);

  const [formData, setFormData] = useState({
    country: "",
    city: "",
    address1: "",
    address2: "",
    zipCode: "",
    addressType: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.address1.trim()) newErrors.address1 = "Address 1 is required";
    if (!formData.zipCode) newErrors.zipCode = "Zip code is required";
    if (!formData.addressType.trim())
      newErrors.addressType = "Address type is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v2/user/add-address",
        { ...formData, email }
      );
      if (response.status === 201) {
        toast.success("Address added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/profile");
      }
    } catch (err) {
      console.error("Error adding address:", err);
      toast.error(
        err.response?.data?.message ||
          "Failed to add address. Please check the details.",
        { position: "top-right", autoClose: 4000 }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      {/* Background gradient & main container */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
        {/* Card-style form with max-width for large screens */}
        <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Gradient header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 py-4 px-6">
            <h2 className="text-white text-2xl md:text-3xl font-bold">
              Add New Address
            </h2>
            <p className="text-blue-100 opacity-80">Fill in your address details</p>
          </div>

          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              {[
                { name: "country", label: "Country", required: true },
                { name: "city", label: "City", required: true },
                { name: "address1", label: "Address Line 1", required: true },
                { name: "address2", label: "Address Line 2 (optional)", required: false },
                { name: "zipCode", label: "ZIP Code", required: true, type: "number" },
                {
                  name: "addressType",
                  label: "Address Type (e.g., Home, Office)",
                  required: true,
                },
              ].map((field) => (
                <div key={field.name} className="mb-4">
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
                  >
                    {field.required && (
                      <span className="text-red-500 font-bold ml-1">*</span>
                    )}
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type || "text"}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                      errors[field.name] ? "border-red-400" : "border-gray-300"
                    }`}
                    placeholder={field.label}
                    required={field.required}
                  />
                  {errors[field.name] && (
                    <span className="text-red-500 text-sm block mt-1">
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 mt-6 text-white font-medium rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 shadow-md hover:shadow-lg relative ${
                  loading ? "opacity-80 pointer-events-none" : ""
                }`}
              >
                {loading ? <LoadingSpinner extraClasses="text-white" /> : "Add Address"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAddress;
