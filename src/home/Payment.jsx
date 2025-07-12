import React, { useEffect, useState } from "react";
import { FaCashRegister, FaMobileAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Payment() {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("selectedAddress");
    if (stored) {
      setAddress(JSON.parse(stored));
    }
  }, []);

  const handlePayment = async (method) => {
    const confirmed = window.confirm(
      `Confirm ${method} for delivery to:\n${address.street}, ${address.city}?`
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          paymentMethod: method,
          placedAt: new Date(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Your order has been accepted and will be delivered within 7 days.");
        localStorage.removeItem("selectedAddress");
        window.location.href = "/you";
      } else {
        alert(data.message || "❌ Failed to place order");
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("⚠️ Server error");
    } finally {
      setLoading(false);
    }
  };

  if (!address) {
    return (
      <p className="p-6 text-center text-red-600 font-semibold animate-pulse">
        ⚠️ No address selected.
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center animate-fadeIn">
        🧾 Payment Options
      </h1>

      {/* Delivery Address */}
      <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
          <FaMapMarkerAlt className="text-green-600 mr-2" />
          Deliver To:
        </h2>
        <div className="text-gray-700 ml-6">
          <p><strong>{address.name}</strong> — {address.phone}</p>
          <p>{address.street}</p>
          <p>{address.city}, {address.state} - {address.zip}</p>
        </div>
      </div>

      {/* Payment Methods */}
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">💳 Choose Payment Method</h2>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => handlePayment("Cash on Delivery")}
          disabled={loading}
          className={`flex items-center justify-center gap-3 py-3 px-4 rounded-md shadow transition-all duration-200 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <FaCashRegister /> {loading ? "Placing Order..." : "Cash on Delivery"}
        </button>
        <button
          onClick={() => handlePayment("PhonePe")}
          disabled={loading}
          className={`flex items-center justify-center gap-3 py-3 px-4 rounded-md shadow transition-all duration-200 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          <FaMobileAlt /> {loading ? "Placing Order..." : "Pay with PhonePe"}
        </button>
      </div>
    </div>
  );
}
