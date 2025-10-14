// src/pages/Carts.jsx
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  orderConfirm,
} from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

function Carts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handling = 2;
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + 199 * item.quantity,
    0
  );
  const grandTotal = useCallback(() => totalPrice + handling, [totalPrice]);

  return (
    <div className="w-full min-h-screen mt-[13vh] px-4 md:px-10 py-4">
      <h1 className="text-[1.5rem] font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[60vh] text-center">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty.</p>
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => navigate("/menu")}
          >
            Explore Menu
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ---- Cart Items ---- */}
          <div className="w-full lg:w-[70%] flex flex-wrap justify-center gap-6 overflow-y-auto max-h-[70vh]">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#DBEDF7] w-full sm:w-[45%] md:w-[40%] flex flex-col items-center md:items-start gap-3 rounded-xl shadow-md p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="flex flex-col w-full">
                  <h2 className="font-bold text-lg mb-1 text-center md:text-left">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1">
                    Cuisine: {item.cuisine}
                  </p>
                  <p className="text-sm text-gray-600 mb-1 font-semibold">
                    Qty: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">
                    ₹ {199 * item.quantity}
                  </p>

                  <div className="w-full flex justify-between items-center mt-3">
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Remove
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="bg-[#c9c6c6] font-semibold py-1 px-2 rounded"
                      >
                        ➖
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="bg-[#c9c6c6] font-semibold py-1 px-2 rounded"
                      >
                        ➕
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ---- Bill Details ---- */}
          <div className="w-full lg:w-[30%] bg-[#DBEDF7] p-5 rounded-xl shadow-md flex flex-col gap-4">
            <h1 className="text-[1.2rem] font-bold">Bill Details</h1>

            <div className="flex justify-between">
              <p>Total Items ({cartItems.length})</p>
              <h2 className="text-xl font-semibold">₹ {totalPrice}</h2>
            </div>

            <div className="flex justify-between">
              <p>
                <i className="fa-solid fa-truck"></i> Delivery Charges
              </p>
              <p className="text-[#050bb5] font-semibold">FREE</p>
            </div>

            <div className="flex justify-between">
              <p>
                <i className="fa-solid fa-bag-shopping"></i> Handling Charges
              </p>
              <p>₹ {handling}</p>
            </div>

            <div className="flex justify-between border-t pt-3">
              <h1>Grand Total</h1>
              <h1 className="text-[1.3rem] text-[#fc3434] font-bold">
                ₹ {grandTotal()}
              </h1>
            </div>

            <button
              onClick={() => {
                toast.success("Order Placed Successfully!", {
                  position: "top-center",
                  autoClose: 1500,
                  theme: "light",
                  transition: Bounce,
                });
                dispatch(orderConfirm());
                setTimeout(() => navigate("/history"), 1800);
              }}
              className="bg-[#6A6CC7] font-semibold text-white px-6 py-2 rounded hover:bg-gray-900 transition"
            >
              Place Order
            </button>

            <button
              onClick={() => dispatch(clearCart())}
              className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carts;
