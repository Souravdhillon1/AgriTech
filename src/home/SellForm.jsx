import React, { useState } from "react";
import {
  FaArrowLeft,
  FaTags,
  FaRupeeSign,
  FaImage,
  FaInfoCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SellForm({ goBack }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageFile: null,
  });
  const [preview, setPreview] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.imageFile) {
      setMsg("❌ Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("image", form.imageFile);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/sell", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        // ✅ redirect to profile page where listings show
        navigate("/you");
      } else {
        setMsg(data.message || "❌ Failed to list item.");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setMsg("⚠️ Server error.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-10 bg-gradient-to-br from-green-50 to-white rounded-xl shadow-md mt-8">
      <button
        onClick={() => (goBack ? goBack() : navigate(-1))}
        className="flex items-center text-green-700 font-medium mb-6 hover:underline"
      >
        <FaArrowLeft className="mr-2" /> Back to More
      </button>

      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
        📤 Sell Your Item
      </h2>

      {msg && (
        <p
          className={`mb-4 text-center font-semibold ${
            msg.startsWith("✅")
              ? "text-green-600"
              : msg.startsWith("⚠️")
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {msg}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="flex items-center text-gray-700 font-semibold mb-1">
            <FaTags className="mr-2" /> Item Name
          </label>
          <input
            type="text"
            placeholder="e.g. Mahindra Tractor"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-400"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center text-gray-700 font-semibold mb-1">
            <FaInfoCircle className="mr-2" /> Description
          </label>
          <textarea
            placeholder="Add details like model, usage, condition..."
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-400"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="flex items-center text-gray-700 font-semibold mb-1">
            <FaRupeeSign className="mr-2" /> Price (₹)
          </label>
          <input
            type="number"
            placeholder="Enter your asking price"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-400"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="flex items-center text-gray-700 font-semibold mb-1">
            🏷️ Category
          </label>
          <input
            type="text"
            placeholder="e.g. Livestock, Equipment, Tools"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-400"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="flex items-center text-gray-700 font-semibold mb-1">
            <FaImage className="mr-2" /> Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={(e) => {
              const file = e.target.files[0];
              setForm({ ...form, imageFile: file });
              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            }}
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover mt-3 rounded-md shadow-md"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-600 text-white font-semibold py-3 rounded-md shadow hover:bg-green-700 transition-transform transform hover:-translate-y-0.5 active:scale-95 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "⏳ Listing..." : "🚀 List Item for Sale"}
        </button>
      </form>
    </div>
  );
}
