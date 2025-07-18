import React, { useEffect, useState } from "react";
import Product from "../components/auth/Product"; // Let's assume this is updated (see below)
import NavBar from "../components/auth/nav";
import LoadingSpinner from "../components/common/LoadingSpinner"; // See spinner suggestion below

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v2/product/get-products");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-black">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-lg font-medium text-slate-200">
            Loading Products...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-black">
        <p className="text-lg font-medium text-red-400">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
          Product Gallery
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <Product key={product._id} {...product} />
            ))
          ) : (
            <div className="col-span-full text-center text-slate-400">
              No products found.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
