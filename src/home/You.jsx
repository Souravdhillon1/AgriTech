import React, { useEffect, useState } from "react";

export default function You() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user", {
          credentials: "include",
        });

        if (res.status === 401) {
          setError("You must be logged in to view this page.");
          setUserData(null);
          return;
        }

        const data = await res.json();
        setUserData(data);
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error("User fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p className="p-10 text-center text-gray-500">Loading your profile...</p>;
  }

  if (error) {
    return <p className="p-10 text-center text-red-600">{error}</p>;
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">👤 Your Profile</h1>

      {/* User Info */}
      <div className="bg-white rounded-xl shadow p-6 mb-10 border border-blue-100">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Personal Info</h2>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Name:</strong> {userData.name || "N/A"}</p>
      </div>

      {/* Addresses */}
      <div className="bg-white rounded-xl shadow p-6 mb-10 border border-emerald-100">
        <h2 className="text-xl font-semibold mb-4 text-emerald-600">📬 Saved Addresses</h2>
        {userData.addresses?.length === 0 ? (
          <p>No addresses saved.</p>
        ) : (
          <ul className="space-y-4">
            {userData.addresses.map((addr, i) => (
              <li key={i} className="border p-3 rounded-lg">
                <p><strong>{addr.name}</strong> — {addr.phone}</p>
                <p>{addr.street}, {addr.city}, {addr.state} - {addr.zip}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Orders */}
<div className="bg-white rounded-xl shadow p-6 mb-10 border border-yellow-100">
  <h2 className="text-xl font-semibold mb-4 text-yellow-600">🛒 Order History</h2>
  {userData.orders?.length === 0 ? (
    <p>No past orders found.</p>
  ) : (
    <ul className="space-y-6">
      {userData.orders.map((order, i) => (
        <li key={i} className="border p-4 rounded-md bg-yellow-50">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-700">
              Order on {new Date(order.createdAt).toLocaleString()}
            </p>
            <span className="text-sm text-blue-600 font-medium">
              {order.paymentMethod}
            </span>
          </div>

          <ul className="ml-4 list-disc text-sm text-gray-700 mt-2">
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.name} × {item.quantity} = ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>

          <p className="mt-2 text-green-700 font-bold">Total: ₹{order.total}</p>

          <div className="mt-3 text-sm text-gray-600">
            <p className="font-medium">Delivered To:</p>
            <p>{order.address.name} — {order.address.phone}</p>
            <p>{order.address.street}, {order.address.city}, {order.address.state} - {order.address.zip}</p>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>


      {/* Listed Items */}
      <div className="bg-white rounded-xl shadow p-6 border border-indigo-100">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">📢 Your Listings</h2>
        {userData.listedItems?.length === 0 ? (
          <p>You have not listed any items for sale.</p>
        ) : (
          <ul className="space-y-6">
            {userData.listedItems.map((item, i) => (
              <li key={i} className="flex items-start border p-4 rounded-md gap-4">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div>
                  <p className="font-bold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="mt-1 font-semibold text-green-600">₹{item.price}</p>
                  <p className="text-xs text-gray-400">Category: {item.category}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
