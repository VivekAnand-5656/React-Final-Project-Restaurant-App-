// src/pages/History.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { motion } from "framer-motion";

const History = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.cart.order);

  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const getStatus = (index) => {
    const statuses = ["Delivered", "In Progress", "Cancelled"];
    return statuses[index % 3];
  };

  const filteredOrders = orders.filter((item, index) => {
    const orderDate = new Date().toISOString().split("T")[0];
    const matchesDate = !dateFilter || orderDate === dateFilter;
    const matchesStatus =
      statusFilter === "All" || getStatus(index) === statusFilter;
    return matchesDate && matchesStatus;
  });

  const handleReorder = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="w-full min-h-[87vh] mt-[13vh] px-4 sm:px-8 py-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-2">Your Order History 🍕🍔🍰</h1>
      <p className="text-gray-600 mb-6">
        Here’s a summary of all your past delicious moments.
      </p>

      {/* 🔹 Filters Section */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <select
          className="border rounded-md px-3 py-2 text-sm shadow-sm focus:ring focus:ring-blue-200"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Delivered">Delivered</option>
          <option value="In Progress">In Progress</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <input
          type="date"
          className="border rounded-md px-3 py-2 text-sm shadow-sm focus:ring focus:ring-orange-200"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* 🔹 Orders Display */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16">
          <p className="text-gray-500 text-lg mb-3">
            You haven’t placed any orders yet.
          </p>
          <button
            onClick={() => (window.location.href = "/menu")}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Browse Menu 🍽️
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4">
          {filteredOrders.map((item, index) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-md overflow-hidden transition p-3 sm:p-4"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-[25%] h-40 sm:h-auto object-cover rounded-lg"
              />

              {/* Content */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center w-full sm:w-[75%] mt-3 sm:mt-0 sm:pl-4 gap-3">
                {/* Left Info */}
                <div>
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-600 text-sm mb-2">
                    Cuisine: {item.cuisine || "Continental"}
                  </p>
                </div>

                {/* Middle Info */}
                <div>
                  <p className="font-semibold text-gray-700">
                    ₹ {199 * item.quantity}
                  </p>
                  <p className="text-sm mt-1 text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                {/* Right Info */}
                <div className="flex flex-col gap-2">
                  <p
                    className={`text-sm font-medium ${
                      getStatus(index) === "Delivered"
                        ? "text-green-600"
                        : getStatus(index) === "In Progress"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    Status: {getStatus(index)}
                  </p>
                  <p className="text-xs text-gray-400">
                    Ordered on: {new Date().toLocaleDateString()}
                  </p>

                  <button
                    onClick={() => handleReorder(item)}
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                  >
                    🔁 Order Again
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
