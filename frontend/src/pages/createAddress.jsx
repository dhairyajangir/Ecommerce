import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../components/auth/nav";
import { useSelector } from 'react-redux'; // Import useSelector

const CreateAddress = () => {
    const navigate = useNavigate();

    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [addressType, setAddressType] = useState("");

    //Retrieve email from Redux state
   const email = useSelector((state) => state.user.email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const addressData = {
            country,
            city,
            address1,
            address2,
            zipCode,
            addressType,
            email
        };

        try {
            const response = await axios.post(
                "http://localhost:8000/api/v2/user/add-address",
                addressData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            if (response.status === 201) {
                alert("Address added successfully!");
                navigate("/profile");
            }
        } catch (err) {
            console.error("Error adding address:", err);
            alert("Failed to add address. Please check the data and try again.");
        }
    };

return (
        <>
            <Nav />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
                <div className="w-[90%] max-w-[500px] bg-white shadow-md h-auto rounded-md p-6 mx-auto mt-8 sm:mt-16 lg:mt-24">
                    <h5 className="text-[24px] font-bold text-center mb-4 text-gray-700">
                        Add Address
                    </h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label className="pb-1 block text-gray-600 font-medium">
                                Country <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={country}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200"
                                onChange={(e) => setCountry(e.target.value)}
                                placeholder="Enter country"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label className="pb-1 block text-gray-600 font-medium">
                                City <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={city}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200"
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Enter city"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label className="pb-1 block text-gray-600 font-medium">
                                Address 1 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={address1}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200"
                                onChange={(e) => setAddress1(e.target.value)}
                                placeholder="Enter address 1"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label className="pb-1 block text-gray-600 font-medium">
                                Address 2
                            </label>
                            <input
                                type="text"
                                value={address2}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200"
                                onChange={(e) => setAddress2(e.target.value)}
                                placeholder="Enter address 2 (optional)"
                            />
                        </div>
<div className="mt-4">
                            <label className="pb-1 block text-gray-600 font-medium">
                                Zip Code <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={zipCode}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200"
                                onChange={(e) => setZipCode(e.target.value)}
                                placeholder="Enter zip code"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label className="pb-1 block text-gray-600 font-medium">
                                Address Type <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={addressType}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200"
                                onChange={(e) => setAddressType(e.target.value)}
                                placeholder="Enter address type (e.g., Home, Work)"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-6 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors duration-200"
                        >
                            Add Address
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateAddress;
