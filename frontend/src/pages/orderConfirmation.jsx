// OrderConfirmation.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../components/auth/nav';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addressId, email } = location.state || {};

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        if (!addressId || !email) {
            navigate('/select-address');
            return;
        }

        const fetchData = async () => {
            try {
                const [addressResponse, cartResponse] = await Promise.all([
                    axios.get('http://localhost:8000/api/v2/user/addresses', { params: { email } }),
                    axios.get('http://localhost:8000/api/v2/product/cartproducts', { params: { email } })
                ]);

                const address = addressResponse.data.addresses.find(addr => addr._id === addressId);
                setSelectedAddress(address || {});

                const processedCartItems = cartResponse.data.cart.map(item => ({
                    _id: item.productId._id,
                    name: item.productId.name,
                    price: item.productId.price,
                    images: item.productId.images.map(imagePath => `http://localhost:8000${imagePath}`),
                    quantity: item.quantity,
                }));
                setCartItems(processedCartItems);
                setTotalPrice(processedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [addressId, email, navigate]);

    const handlePlaceOrder = async () => {
        try {
            const orderItems = cartItems.map(item => ({
                product: item._id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                image: item.images[0] || '/default-avatar.png'
            }));

            const response = await axios.post('http://localhost:8000/api/v2/orders/place-order', {
                email,
                shippingAddress: selectedAddress,
                orderItems,
            });
            setOrderDetails(response.data.orders);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    const closePopup = () => {
        navigate('/myorders');
    };

    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-purple-100 to-blue-200'>
            <Nav />
            <div className='max-w-5xl mx-auto p-6'>
                <h2 className='text-3xl font-bold text-center mb-8'>Order Confirmation</h2>
                {loading ? (
                    <p className='text-center'>Processing...</p>
                ) : error ? (
                    <div className='text-center text-red-500'>{error}</div>
                ) : (
                    <div className='space-y-6'>
                        <div className='bg-white p-6 rounded-lg shadow-lg'>
                            <h3 className='text-xl font-semibold mb-4'>Shipping Address</h3>
                            <p>{selectedAddress.address1}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.zipCode}</p>
                        </div>

                        <div className='bg-white p-6 rounded-lg shadow-lg'>
                            <h3 className='text-xl font-semibold mb-4'>Cart Items</h3>
                            {cartItems.map(item => (
                                <div key={item._id} className='flex items-center justify-between p-4 border-b'>
                                    <img src={item.images[0] || '/default-avatar.png'} alt={item.name} className='w-20 h-20 object-cover rounded-lg' />
                                    <div className='flex-1 ml-4'>
                                        <h4 className='font-medium'>{item.name}</h4>
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                    <p className='font-bold'>${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        <div className='sticky bottom-0 bg-white p-6 rounded-lg shadow-lg flex justify-between items-center'>
                            <p className='text-xl font-bold'>Total: ${totalPrice.toFixed(2)}</p>
                            <button onClick={handlePlaceOrder} className='bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600'>
                                Place Order
                            </button>
                        </div>
                    </div>
                )}
                {orderDetails && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                         <div className='bg-white p-6 rounded-lg shadow-lg max-w-2xl relative'>
                            <h2 className='text-2xl font-bold mb-4'>Order Placed Successfully!</h2>
                            {orderDetails.map((order, index) => (
                                <div key={index} className='mb-6'>
                                    <h3 className='text-xl font-semibold'>Order #{index + 1}</h3>
                                    <p>Total Amount: ${order.totalAmount}</p>
                                    <h4 className='font-medium mt-4'>Items:</h4>
                    <ul className='list-disc ml-6'>
                        {order.orderItems.map((item, i) => (
                            <li key={i}>{item.name} - {item.quantity} x ${item.price}</li>
                        ))}
                    </ul>
                </div>
            ))}
            <button 
                onClick={closePopup} 
                className='absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-100'
            >
                ❌
            </button>
        </div>
    </div>
)}

            </div>
        </div>
    );
};

export default OrderConfirmation;
