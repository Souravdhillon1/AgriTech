import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Search() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();          // ① for Buy‑now redirect
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      try {
        const res = await fetch(
          `http://https://agritech-backend-o5e8.onrender.com/api/search?query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Search error:", err);
      }
    };
    fetchResults();
  }, [query]);

  /** ② simple cart handler (replace with your own Redux / Context / API call) */
  const handleAddToCart = async (product) => {
    try {
      await fetch("http://https://agritech-backend-o5e8.onrender.com/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
        credentials: "include", // ✅ needed for sessions
      });
      alert(`${product.name} added to cart ✔`);
    } catch (err) {
      console.error(err);
      alert("Could not add to cart");
    }
  };

  /** ③ buy‑now just navigates to a checkout page with the product id */
  const handleBuyNow = () => {
    navigate("/address");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for &quot;{query}&quot;
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-lg shadow flex flex-col"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full aspect-square object-cover object-center rounded-md"
              />

              <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-700 flex-1">{product.description}</p>
              <p className="text-green-600 font-bold mt-1">₹{product.price}</p>

              {/* --- buttons --- */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleBuyNow(product)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md text-sm font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Search;
