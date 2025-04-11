import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Loader, AlertCircle } from "lucide-react";
import Nav from '../components/auth/nav'
import { useSelector } from 'react-redux'; // Import useSelector

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const email = useSelector((state) => state.user.email)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v2/product/product/${id}`
        );
        setProduct(response.data.product);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product !== null) {
        console.log("Updated product state:", product);
        console.log("Product name:", product.name);
    }
}, [product]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev >= 1 ? prev - 1 : 1));

  const addtocart = async () => {
    try {
        const response = await axios.post(
            "http://localhost:8000/api/v2/product/cart",
            {
                userId: email,
                productId: id,
                quantity: quantity,
            }
        );
        console.log("Added to cart:", response.data);
    } catch (err) {
        console.error("Error adding to cart:", err);
    }
};
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-gray-500" size={40} />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <AlertCircle size={40} /> Error: {error.message}
      </div>
    );

    if (!product) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-gray-500 text-xl">No product found.</div>
			</div>
		);
	}

  return (
    <>
    <Nav/>
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 min-h-screen p-6">
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2 p-4">
          {product.images?.length ? (
              <img
              src={`http://localhost:8000${product.images[0]}`}
              alt={product.name}
              className="w-full h-96 object-contain rounded-md"
              />
            ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
              No Image Available
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-3">{product.description}</p>
          <span className="text-lg font-semibold text-gray-700">Category: {product.category}</span>
         
          {/* Price & Quantity */}
          {product.tags && product.tags.length > 0 && (
              <div>
										<h2 className="text-xl font-medium text-gray-700">
											Tags
										</h2>
										<div className="mt-2 flex flex-wrap">
											{product.tags.map((tag, index) => (
                                                <span
                                                key={index}
                                                className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full"
												>
													{tag}
												</span>
											))}
										</div>
									</div>
			)}
          <div className="flex items-center space-x-6 my-4">
            <p className="text-2xl font-semibold text-indigo-600">${product.price}</p>
            <div className="flex items-center border rounded-lg px-3 py-1">
              <button onClick={handleDecrement} className="p-2 text-gray-700 hover:bg-gray-200 rounded-full">
                <IoIosRemove size={20} />
              </button>
              <span className="px-4 text-lg">{quantity}</span>
              <button onClick={handleIncrement} className="p-2 text-gray-700 hover:bg-gray-200 rounded-full">
                <IoIosAdd size={20} />
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-transform transform hover:-translate-y-1"
          onClick={addtocart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
</div>
    </>
  );
};

export default ProductDetails;