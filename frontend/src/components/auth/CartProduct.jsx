import React, { useState, useEffect } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'; // Import useSelector

export default function CartProduct({ _id, name, images, quantity, price }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantityVal, setQuantityVal] = useState(quantity);
    const email = useSelector((state) => state.user.email)

    useEffect(() => {
        if (!images || images.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);

    const handleIncrement = () => {
        const newquantityVal = quantityVal + 1;
        setQuantityVal(newquantityVal);
        updateQuantityVal(newquantityVal);
    };

    const handleDecrement = () => {
        const newquantityVal = quantityVal > 1 ? quantityVal - 1 : 1;
        setQuantityVal(newquantityVal);
        updateQuantityVal(newquantityVal);
    };

    const updateQuantityVal = (quantity) => {
        fetch('http://localhost:8000/api/v2/product/cartproduct/quantity', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                productId: _id,
                quantity,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log('quantityVal updated:', data);
            })
            .catch((err) => {
                console.error('Error updating quantityVal:', err);
            });
    };

    const currentImage = images[currentIndex];

    return (
        <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b border-neutral-300 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col gap-4">
                <div className="w-40 h-40 overflow-hidden rounded-lg">
                    <img
                        src={`http://localhost:8000${currentImage}`}
                        alt={name}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="flex gap-2 items-center justify-center">
                    <button onClick={handleDecrement} className="p-2 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-full transition-all">
                        <IoIosRemove />
                    </button>
                    <span className="px-4 py-1 bg-gray-100 rounded-lg">{quantityVal}</span>
                    <button onClick={handleIncrement} className="p-2 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-full transition-all">
                        <IoIosAdd />
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-start md:items-end mt-4 md:mt-0">
                <h2 className="text-lg font-semibold text-neutral-800">{name}</h2>
                <p className="text-xl font-bold text-green-600">${price * quantityVal}</p>
            </div>
        </div>
    );
}

CartProduct.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired
};
