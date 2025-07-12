import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Address() {
  const [savedaddresses, setsavedaddresses] = useState([]);
  const [form, setform] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });
   const navigate = useNavigate();

const handleSelectAddress = (selectedAddress) => {
  localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
  navigate("/payment");
};
  useEffect(() => {
    const fetchaddresses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/addresses", {
          credentials: "include",
        });
        const data = await res.json(); // ✅ await this!
        setsavedaddresses(data);
      } catch (error) {
        console.error("Fetch address error:", error);
      }
    };

    fetchaddresses();
  }, []);

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault(); // ✅ Corrected: use `preventDefault()` not `preventdefault()`
    try {
      const res = await fetch("http://localhost:5000/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const newaddress = await res.json();
      setsavedaddresses([...savedaddresses, newaddress]);
      setform({ name: "", phone: "", street: "", city: "", state: "", zip: "" });
      alert("Address added");
    } catch (error) {
      console.error("Address error:", error);
      alert("Failed to add address");
    }
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Addresses</h1>

      {/* Saved Addresses */}
      {savedaddresses.length === 0 ? (
        <p>No saved addresses.</p>
      ) : (
        <ul className="mb-8 space-y-4">
          {savedaddresses.map((addr, i) => (
  <li key={i} className="bg-white p-4 rounded shadow relative">
    <p>
      <strong>{addr.name}</strong> — {addr.phone}
    </p>
    <p>
      {addr.street}, {addr.city}, {addr.state} - {addr.zip}
    </p>
    <button
      onClick={() => handleSelectAddress(addr)}
      className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
    >
      Select
    </button>
  </li>
))}
        </ul>
      )}

      {/* New Address Form */}
      <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
      <form onSubmit={handlesubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handlechange} placeholder="Full Name" className="w-full border p-2 rounded" required />
        <input name="phone" value={form.phone} onChange={handlechange} placeholder="Phone" className="w-full border p-2 rounded" required />
        <input name="street" value={form.street} onChange={handlechange} placeholder="Street Address" className="w-full border p-2 rounded" required />
        <input name="city" value={form.city} onChange={handlechange} placeholder="City" className="w-full border p-2 rounded" required />
        <input name="state" value={form.state} onChange={handlechange} placeholder="State" className="w-full border p-2 rounded" required />
        <input name="zip" value={form.zip} onChange={handlechange} placeholder="Zip Code" className="w-full border p-2 rounded" required />

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Save Address
        </button>
      </form>
    </div>
  );
}

export default Address;
