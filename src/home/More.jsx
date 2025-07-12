import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SellForm from "./SellForm";
import { FaShoppingCart, FaUpload } from "react-icons/fa";

export default function More() {
  const [tab, setTab] = useState("menu");
  const navigate = useNavigate();

  if (tab === "sell") return <SellForm goBack={() => setTab("menu")} />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white px-6 py-10 space-y-10">
      <h1 className="text-4xl font-bold text-green-700 drop-shadow-md">🌿 More Options</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {/* Buy Card */}
        <button
          onClick={() => navigate("/home")}
          className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 border-t-4 border-green-500 w-72 h-60"
        >
          <FaShoppingCart className="text-4xl text-green-600 mb-4 animate-pulse" />
          <h2 className="text-xl font-semibold text-gray-800">Buy Products</h2>
          <p className="text-gray-600 text-center mt-2">Explore our curated collection of agricultural items, seeds, tools & more.</p>
        </button>

        {/* Sell Card */}
        <button
          onClick={() => navigate("/sell")}
          className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 border-t-4 border-yellow-500 w-72 h-60"
        >
          <FaUpload className="text-4xl text-yellow-600 mb-4 animate-pulse" />
          <h2 className="text-xl font-semibold text-gray-800">Sell Your Items</h2>
          <p className="text-gray-600 text-center mt-2">List your tractor, cattle, tools or other agri equipment for buyers.</p>
        </button>
      </div>
    </div>
  );
}
