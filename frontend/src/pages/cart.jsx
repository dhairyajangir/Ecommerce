import CartProduct from '../components/auth/CartProduct';
import Nav from '../components/auth/nav';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from "../components/common/LoadingSpinner"; // Spinner (you can use your own)
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const email = useSelector((state) => state.user.email);

  useEffect(() => {
    if (!email) {
      setError("User session expired. Please login again.");
      setLoading(false);
      return;
    }
    fetch(`http://localhost:8000/api/v2/product/cartproducts?email=${email}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProducts(
          data?.cart?.map((product) => ({
            quantity: product['quantity'],
            ...product['productId'],
          })) || []
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching products.");
        setLoading(false);
      });
  }, [email]);

  const handlePlaceOrder = () => {
    if (!products.length) {
      toast.info("Your cart is empty!");
      return;
    }
    navigate('/select-address');
  };

  // Calculate price summary if desired
  const subtotal = products.reduce(
    (total, p) => total + (p.price * (p.quantity || 1)), 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-100 via-white to-blue-100">
      <Nav />
      <div className="flex flex-col items-center py-8 px-2 min-h-screen w-full">
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-0 md:p-6 flex flex-col h-full">
          <div className="w-full flex items-center justify-between border-b px-4 py-5">
            <h1 className="text-3xl font-bold text-blue-800 tracking-tight">Your Cart</h1>
            {products.length > 0 && (
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-semibold text-sm shadow"> {products.length} items </span>
            )}
          </div>
          {/* Content zone */}
          <div className="flex-grow overflow-y-auto px-4 py-4 space-y-5">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center mt-10 text-red-500">{error}</div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24">
                <img
                  src="https://www.svgrepo.com/show/158189/empty-cart.svg"
                  alt="Empty cart"
                  className="w-32 opacity-75 mb-6"
                />
                <div className="text-lg text-slate-400 font-medium">
                  Your cart is empty. Let's go <a
                    href="/"
                    className="text-blue-500 hover:text-blue-700 underline"
                  >shopping!</a>
                </div>
              </div>
            ) : (
              products.map(product => (
                <CartProduct key={product._id} {...product} />
              ))
            )}
          </div>
          {/* FOOTER - price and place order */}
          <div className="w-full border-t px-4 py-5 flex flex-col md:flex-row items-center justify-between bg-slate-50 rounded-b-xl gap-4">
            {products.length > 0 && (
              <div className="w-full md:w-auto flex items-center gap-2 text-slate-700 font-medium text-lg">
                <span>Subtotal: </span>
                <span className="font-bold text-blue-700">₹{subtotal.toLocaleString()}</span>
              </div>
            )}
            <button
              onClick={handlePlaceOrder}
              className={`flex-1 md:flex-none w-full md:w-auto bg-blue-600 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-200 ${
                loading ? "opacity-70 pointer-events-none" : ""
              }`}
              disabled={loading || !products.length}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
