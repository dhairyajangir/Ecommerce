
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../components/auth/nav';
import { FaBox, FaShippingFast, FaTimesCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux'; // Import useSelector

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const defaultEmail = useSelector((state) => state.user.email);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get('http://localhost:8000/api/v2/orders/myorders', {
                params: { email: defaultEmail },
            });
            setOrders(response.data.orders);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching orders');
        } finally {
            setLoading(false);
        }
    };

    const cancelOrder = async (orderId) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/v2/orders/cancel-order/${orderId}`);
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, status: response.data.order.status } : order
                )
            );
            fetchOrders();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Error cancelling order');
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <Nav />
            <div className='w-full min-h-screen bg-gradient-to-br from-indigo-200 to-cyan-200'>
                <div className="min-h-screen py-10"> 
                    <div className="max-w-5xl mx-auto px-6">
                        <h1 className="text-5xl font-bold text-center mb-10 text-indigo-800">My Orders</h1>

                        {loading && <p className="text-center text-blue-500 text-lg">Loading orders...</p>}
                        {error && <p className="text-center text-red-500 text-lg">{error}</p>}

                        {orders.length > 0 ? (
                            <div className="grid gap-8">
                                {orders.map((order) => (
                                    <div key={order._id} className="bg-white rounded-2xl shadow-xl p-6 transition transform hover:scale-105 hover:shadow-2xl">
                                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                                            <p className="text-lg font-semibold flex items-center gap-2">
                                                <FaBox className="text-indigo-600" /> Order ID: <span className="font-light text-sm">{order._id}</span>
                                            </p>
                                            <p className="text-2xl font-bold text-green-600">${order.totalAmount}</p>
                                        </div>

                                        <div className="mb-4">
                                            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                                <FaShippingFast className="text-blue-500" /> Shipping Address
                                            </h2>
                                            <div className="text-gray-700 ml-4 space-y-1">
                                                <p>{order.shippingAddress.address1}</p>
                                                {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                                                <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                                                <p>{order.shippingAddress.country}</p>
                                                <p className="italic">{order.shippingAddress.addressType}</p>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <h2 className="text-xl font-semibold mb-2">Items</h2>
                                            <ul className="list-disc ml-8 space-y-1 text-gray-700">
                                                {order.orderItems.map((item, index) => (
                                                    <li key={index}>{item.name} - Qty: {item.quantity} - ${item.price}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        {order.orderStatus !== 'Cancelled' ? (
                                            <button onClick={() => cancelOrder(order._id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full flex items-center gap-2">
                                                <FaTimesCircle /> Cancel Order
                                            </button>
                                        ) : (
                                            <p className="text-red-600 font-semibold">Order Cancelled</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            !loading && <p className="text-center text-gray-500 mt-10 text-lg">No orders found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyOrdersPage;
