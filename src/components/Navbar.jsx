import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggle, isLogin, setUser, logoutUser } from "../features/show";
import { motion } from "framer-motion";
import { ToastContainer, toast, Bounce, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import person from "../images/person.png";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const shoLog = useSelector((state) => state.showLogin.isShow);
  const isLoged = useSelector((state) => state.showLogin.isLog);
  const curUser = useSelector((state) => state.showLogin.currentUser);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: "", name: "", mobile: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
    };

    if (formData.email === "" || formData.name === "") {
      toast.error("Please fill all fields!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    toast.dismiss();
    toast.success(`Welcome, ${formData.name}! ✅`, {
      position: "top-center",
      autoClose: 2000,
      theme: "dark",
      transition: Flip,
      closeOnClick:true,
      draggable:true,
      pauseOnHover:false,
      
    });

    // ✅ Store data in Redux
    dispatch(setUser(userData));
    dispatch(toggle());
    dispatch(isLogin());

    // ✅ Reset form
    setFormData({ email: "", name: "", mobile: "" });
  };

  const handleLogout = () => {
    dispatch(isLogin());
    dispatch(logoutUser());
    toast.dismiss();
    toast.info("Logged out successfully!", {
      position: "top-center",
      autoClose: 2000,
      theme: "dark",
      transition: Flip,
      closeOnClick: true,
      draggable:true,
      pauseOnHover:false,
    });
  };

  return (
    <>
      <nav className="w-full h-[13vh] fixed z-50 top-0 bg-gradient-to-r from-[#4CAF50] to-[#A9D3A2] shadow-md flex justify-between items-center px-6 md:px-10 transition-all duration-300">
        <h1 className="text-[2.8rem] font-extrabold uppercase text-[#fff] underline decoration-[#00A63E]/70 hover:scale-105 transition-transform duration-300">
          DishLy
        </h1>

        {/* Navigation Links */}
        <ul className="links w-[55%] flex justify-evenly items-center gap-4 font-semibold bg-[#00A63E] px-4 py-2 rounded-full shadow-inner">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-[#2F6D3A] bg-white px-3 py-1 rounded border-2 border-[#2F6D3A] shadow-sm transition-all duration-300"
                  : "text-white hover:text-[#E2F5E6] transition-all duration-300"
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
                  ? "text-[#2F6D3A] bg-white px-3 py-1 rounded border-2 border-[#2F6D3A] shadow-sm transition-all duration-300"
                  : "text-white hover:text-[#E2F5E6] transition-all duration-300"
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
                  ? "text-[#2F6D3A] bg-white px-3 py-1 rounded border-2 border-[#2F6D3A] shadow-sm transition-all duration-300"
                  : "text-white hover:text-[#E2F5E6] transition-all duration-300"
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
                  ? "text-[#2F6D3A] bg-white px-3 py-1 rounded border-2 border-[#2F6D3A] shadow-sm transition-all duration-300"
                  : "text-white hover:text-[#E2F5E6] transition-all duration-300"
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
            className="bg-white text-[#427F56] text-[0.9rem] px-3 py-1.5 cursor-pointer rounded-lg font-semibold hover:bg-gray-100 transition"
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
            <NavLink to="profile" >
              <h1 className="text-[1rem] font-semibold capitalize underline">
              {curUser?.name || "User"}{" "}
              <i className="fa-solid fa-arrow-up-right-from-square ml-1"></i>
            </h1>
            </NavLink>
            <button
              onClick={handleLogout}
              className="bg-white text-[#427F56] text-[0.9rem] px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* --- Login Modal --- */}
      {shoLog && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex justify-center items-center w-[100vw] h-[80vh] z-50 top-0 left-0 bg-[#ffffff83] fixed p-6"
        >
          <motion.div className="bg-white shadow-lg rounded-2xl p-6 w-[90%] sm:w-[400px]">
            <h1
              onClick={() => dispatch(toggle())}
              className="text-[2rem] text-[#f00606] cursor-pointer text-right"
            >
              <i className="fa-solid fa-square-xmark"></i>
            </h1>
            <h2 className="text-2xl font-bold text-center text-[#427F56] mb-4">
              Login to <span className="text-[#00A63E]">DishLy</span>
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A63E]"
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A63E]"
              />
              <input
                type="number"
                name="mobile"
                placeholder="Enter Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A63E]"
              />

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-[#00A63E] text-white py-2 rounded-lg font-semibold shadow-md hover:bg-[#427F56] transition"
              >
                Login
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}

      <ToastContainer />
    </>
  );
};

export default Navbar;
