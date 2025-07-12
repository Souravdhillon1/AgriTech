import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSeedling,
  FaFlask,
  FaTools,
  FaHorseHead,
  FaTractor,
  FaLeaf,
  FaBoxOpen,
} from "react-icons/fa";

export default function Menu() {
  const navigate = useNavigate();

  const categories = [
    { name: "Seeds", icon: <FaSeedling className="text-green-600" />, query: "seeds" },
    { name: "Fertilizers", icon: <FaFlask className="text-blue-600" />, query: "fertilizers" },
    { name: "Tools", icon: <FaTools className="text-gray-600" />, query: "tools" },
    { name: "Livestock", icon: <FaHorseHead className="text-orange-600" />, query: "livestock" },
    { name: "Machinery", icon: <FaTractor className="text-red-600" />, query: "tractor" },
    { name: "Organic", icon: <FaLeaf className="text-emerald-600" />, query: "organic" },
    { name: "Other", icon: <FaBoxOpen className="text-yellow-500" />, query: "misc" },
  ];

  const handleBrowse = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">🌾 Explore Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl shadow p-6 flex flex-col items-center text-center"
          >
            <div className="text-4xl mb-3">{cat.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{cat.name}</h2>
            <button
              onClick={() => handleBrowse(cat.query)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 mt-2 rounded-md text-sm"
            >
              Browse
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
