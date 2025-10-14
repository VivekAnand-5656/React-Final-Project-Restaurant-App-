import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggle, isLogin, setUser, logoutUser } from "../features/show";
import { motion } from "framer-motion";
import { Flip,Bounce,toast } from "react-toastify";

import person from "../images/person.png";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const shoLog = useSelector((state) => state.showLogin.isShow);
  const isLoged = useSelector((state) => state.showLogin.isLog);
  const curUser = useSelector((state) => state.showLogin.currentUser);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: "", name: "", mobile: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, mobile } = formData;
    if (!name || !email) {
      if (!toast.isActive("fillError")) {
        toast.error("Please fill all fields!", {
          toastId: "fillError",
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          transition: Bounce,
        });
      }
      return;
    }

    const userData = { name, email, mobile };

    // ✅ Prevent duplicate toast
    if (!toast.isActive("loginSuccess")) {
      toast.success(`Welcome, ${name}! ✅`, {
        toastId: "loginSuccess",
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Flip,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: false,
      });
    }

    // ✅ Store data in Redux (no loop)
    dispatch(setUser(userData));
    dispatch(isLogin());
    dispatch(toggle());

    // ✅ Reset form
    setFormData({ email: "", name: "", mobile: "" });
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(isLogin());

    if (!toast.isActive("logoutInfo")) {
      toast.info("Logged out successfully!", {
        toastId: "logoutInfo",
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
        transition: Flip,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <>
      <nav className="w-full h-[10vh] fixed z-40 top-0 bg-[#DBEDF7] shadow-md flex justify-between items-center px-6 md:px-10 transition-all duration-300">
        <h1 className="text-[2.8rem] font-extrabold uppercase text-[#6A6CC7] underline  hover:scale-105 transition-transform duration-300">
          DishLy
        </h1>

        {/* Navigation Links */}
        <ul className="links w-[55%] flex justify-evenly items-center gap-4 font-semibold  px-4 py-2 rounded-full shadow-inner">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-[#6A6CC7] px-3 py-1 rounded border-b-2 border-b-[#6A6CC7] transition-all duration-300"
                  : "text-[#6A6CC7] hover:text-[#6A6CC7] transition-all duration-300"
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                   ? "text-[#6A6CC7] px-3 py-1 rounded border-b-2 border-b-[#6A6CC7] transition-all duration-300"
                  : "text-[#6A6CC7] hover:text-[#6A6CC7] transition-all duration-300"
              }
              to="menu"
            >
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                   ? "text-[#6A6CC7] px-3 py-1 rounded border-b-2 border-b-[#6A6CC7] transition-all duration-300"
                  : "text-[#6A6CC7] hover:text-[#6A6CC7] transition-all duration-300"
              }
              to="cart"
            >
              <i className="fa-solid fa-cart-shopping relative">
                <sup className="absolute -top-3 -right-3 bg-[#fa0606] text-white text-xs px-[6px] py-[1px] rounded-full shadow-md">
                  {cartItems.length}
                </sup>
              </i>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                   ? "text-[#6A6CC7] px-3 py-1 rounded border-b-2 border-b-[#6A6CC7] transition-all duration-300"
                  : "text-[#6A6CC7] hover:text-[#6A6CC7] transition-all duration-300"
              }
              to="history"
            >
              Orders
            </NavLink>
          </li>
        </ul>

        {/* --- Login / Profile --- */}
        {!isLoged ? (
          <button
            onClick={() => dispatch(toggle())}
            className="bg-white text-[#6A6CC7] text-[0.9rem] px-3 py-1.5 cursor-pointer rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 "
          >
            Login
          </button>
        ) : (
          <div className="flex justify-center items-center gap-3 cursor-pointer">
            <img
              src={person}
              className="w-[50px] h-[50px] rounded-full"
              alt="profile"
            />
            <NavLink to="profile">
              <h1 className="text-[1rem] font-semibold capitalize underline">
                {curUser?.name || "User"}{" "}
                <i className="fa-solid fa-arrow-up-right-from-square ml-1"></i>
              </h1>
            </NavLink>
            <button
              onClick={handleLogout}
              className="bg-white text-[#42457f] text-[0.9rem] px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* --- Login Modal --- */}
      {shoLog && (
        <motion.div
          key="loginModal"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex justify-center items-center w-screen h-screen fixed z-50 top-0 left-0 bg-[#0000006a] backdrop-blur-sm"
        >
          <motion.div className="bg-white shadow-lg rounded-2xl p-6 w-[90%] sm:w-[400px] relative">
            <h1
              onClick={() => dispatch(toggle())}
              className="text-[2rem] text-[#f00606] cursor-pointer absolute top-3 right-4"
            >
              <i className="fa-solid fa-square-xmark"></i>
            </h1>
            <h2 className="text-2xl font-bold text-center text-[#44427f] mb-4 mt-6">
              Login to <span className="text-[#0b00a6]">DishLy</span>
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6567BE]"
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6567BE]"
              />
              <input
                type="number"
                name="mobile"
                placeholder="Enter Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6567BE]"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-[#6567BE] text-white py-2 rounded-lg font-semibold shadow-md hover:bg-[#6567BE] transition"
              >
                Login
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}

      
    </>
  );
};

export default Navbar;
