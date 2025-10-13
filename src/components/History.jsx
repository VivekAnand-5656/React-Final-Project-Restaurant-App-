import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart,orderConfirm } from "../features/cartSlice";
import { motion } from "framer-motion";

const History = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.cart.order); // Using cart items as mock order data 

  // 🔹 Filters
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  // 🔹 Dummy Status for mock data
  const getStatus = (index) => {
    const statuses = ["Delivered", "In Progress", "Cancelled"];
    return statuses[index % 3];
  };

  // 🔹 Filtered Orders
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
    <div className="w-[100vw] min-h-[87vh] mt-[13vh] px-4 sm:px-8 py-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-2">
        Your Order History 🍕🍔🍰
      </h1>
      <p className="text-gray-600 mb-6">
        Here’s a summary of all your past delicious moments.
      </p>

      {/* 🔹 Filters Section */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <select
          className="border rounded-md px-3 py-2 text-sm shadow-sm focus:ring focus:ring-orange-200"
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
            className="bg-orange-500 text-white px-5 py-2 rounded-lg shadow hover:bg-orange-600 transition"
          >
            Browse Menu 🍽️
          </button>
        </div>
      ) : (
        <div className="w-full h-auto flex flex-wrap gap-2 ">
          {filteredOrders.map((item, index) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className="w-[100%] h-[25vh] flex  bg-white rounded-2xl shadow-md overflow-hidden transition p-2  "
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-[15%] h-full object-cover rounded"
              />
              <div className="p-4 flex justify-around w-[80%] ">
                <div className=" flex flex-col " >
                  <h2 className="font-semibold text-[1rem">{item.name}</h2>
                  <p className="text-gray-600 text-sm mb-2">
                    Cuisine: {item.cuisine || "Continental"}
                  </p>
                </div>
                <div className=" flex flex-col " >
                  <p className="font-semibold text-gray-700">
                    ₹ {199 * item.quantity}
                  </p>
                  <p className="text-sm mt-1 text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <div className=" flex flex-col gap-2 " >
                  <p
                    className={`mt-2 text-sm font-medium ${getStatus(index) === "Delivered"
                      ? "text-green-600"
                      : getStatus(index) === "In Progress"
                        ? "text-yellow-600"
                        : "text-red-600"
                      }`}
                  >
                    Status: {getStatus(index)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Ordered on: {new Date().toLocaleDateString()}
                  </p>

                  <button
                    onClick={() => handleReorder(item)}
                    className="p-2 bg-orange-500 hover:bg-orange-600 text-white  rounded-lg transition cursor-pointer "
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
