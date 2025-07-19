import React, { useEffect, useState } from "react";
import Product from "../components/auth/Product";
import NavBar from "../components/auth/nav";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";

const heroImage =
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80"; // Make sure this path points to a real, gorgeous e-com image

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/v2/product/get-products"
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ---------------------
  // Hero Section
  // ---------------------
  const Hero = () => (
    <section className="relative flex flex-col items-center justify-center h-[55vh] min-h-[320px] w-full overflow-hidden mb-16">
      <img
        src={heroImage}
        alt="Shop the best"
        className="absolute inset-0 w-full h-full object-cover opacity-80 blur-[1px] scale-105"
        draggable="false"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-black/40 to-black/80"></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 drop-shadow-2xl mb-4"
        >
          Discover Fabulous Finds
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, type: "spring" }}
          className="text-lg md:text-2xl max-w-2xl mx-auto font-medium text-slate-200 mb-6"
        >
          Shop trending collections &amp; everyday essentials. Unbeatable deals, stunning designs, and a world of choices awaits!
        </motion.p>
        <motion.a
          href="#products"
          className="inline-block px-8 py-3 rounded-lg font-bold text-white text-lg bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-600 shadow-xl hover:scale-105 hover:shadow-2xl transition transform hover:-translate-y-1 duration-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          Shop Now
        </motion.a>
      </div>
    </section>
  );

  // ---------------------
  // Main Products Grid
  // ---------------------

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
        <p className="text-lg font-medium text-rose-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black">
      <NavBar />
      <Hero />
      <main className="container mx-auto px-3 md:px-6">
        <motion.h2
          id="products"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, type: "spring" }}
          className="text-4xl md:text-5xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-pink-400 to-yellow-300 drop-shadow-xl"
        >
          Our Curated Gallery
        </motion.h2>
        <motion.div
          className="relative pb-16"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.07, delayChildren: 0.2 }
            }
          }}
        >
          {products.length > 0 ? (
            <div
              className="
                grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                gap-8 md:gap-10
                "
            >
              <AnimatePresence>
                {products.map((product, i) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      duration: 0.5,
                      delay: 0.04 * i
                    }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  >
                    <Product {...product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="col-span-full text-center text-slate-400 text-xl font-semibold">
              No products found.
            </div>
          )}
        </motion.div>
      </main>
      {/* --- FABULOUS floating shapes --- */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ y: 40, opacity: 0.1 }}
          animate={{ y: 0, opacity: 0.18 }}
          transition={{ duration: 2.6, repeat: Infinity, repeatType: "reverse" }}
          className="absolute left-16 top-24 w-36 h-36 bg-pink-400 rounded-full blur-3xl opacity-25"
        />
        <motion.div
          initial={{ y: 0, opacity: 0.12 }}
          animate={{ y: 20, opacity: 0.22 }}
          transition={{ duration: 2.4, delay: 0.7, repeat: Infinity, repeatType: "reverse" }}
          className="absolute right-10 top-16 w-56 h-56 bg-yellow-300 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          initial={{ y: 12, opacity: 0.15 }}
          animate={{ y: -20, opacity: 0.09 }}
          transition={{ duration: 3.7, delay: 0.3, repeat: Infinity, repeatType: "reverse" }}
          className="absolute left-1/2 bottom-0 w-72 h-32 bg-blue-300 rounded-full blur-3xl opacity-25"
        />
      </div>
    </div>
  );
}
