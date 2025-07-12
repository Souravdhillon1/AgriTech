import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate(); // ⬅️ Step 1: Get navigate function

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cart", {
            credentials: "include", // ✅ needed for sessions
        });
        const data = await res.json();
        setCartItems(data);

        // Calculate total
        const sum = data.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        setTotal(sum);
      } catch (err) {
        console.error("Cart fetch error:", err);
      }
    };

    fetchCart();
  }, []);

  const handleOrder = () => {
    // ⬅️ Step 2: Navigate to the address page
    navigate("/address");
  };
const handleRemove = async (productId) => {
  try {
    const res = await fetch(`http://localhost:5000/api/cart/${productId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const updatedCart = await res.json();
    setCartItems(updatedCart.cart || []);

    // Recalculate total
    const sum = (updatedCart.cart || []).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(sum);
  } catch (err) {
    console.error("Remove error:", err);
  }
};

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 mb-6">
            {cartItems.map((item) => (
                <div
                key={item._id}
                className="flex items-center gap-4 bg-white p-4 rounded shadow"
                >
                 <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">
                    ₹{item.price} × {item.quantity}
                    </p>
                </div>
                <p className="font-bold text-green-600">
                    ₹{item.price * item.quantity}
                </p>
                <button
                    onClick={() => handleRemove(item._id)}
                    className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                 Remove
                </button>
                </div>
            ))}

            </div>

          <div className="text-right">
            <p className="text-xl font-bold mb-4">Total: ₹{total}</p>
            <button
              onClick={handleOrder}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Order Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
