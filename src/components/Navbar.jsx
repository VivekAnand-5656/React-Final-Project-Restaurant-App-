import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggle, isLogin, setUser, logoutUser } from "../features/show";
import { motion } from "framer-motion";
import { Flip, Bounce, toast } from "react-toastify";
import person from "../images/person.png";


const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const shoLog = useSelector((state) => state.showLogin.isShow);
  const isLoged = useSelector((state) => state.showLogin.isLog);
  const curUser = useSelector((state) => state.showLogin.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ email: "", name: "", mobile: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, mobile } = formData;
    if (!name || !email) {
      toast.error("Please fill all fields!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    dispatch(setUser({ name, email, mobile }));
    dispatch(isLogin());
    dispatch(toggle());
    toast.success(`Welcome, ${name}! ✅`, {
      position: "top-center",
      autoClose: 2000,
      theme: "dark",
      transition: Flip,
    });
    setFormData({ email: "", name: "", mobile: "" });
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(isLogin());
    toast.info("Logged out successfully!", {
      position: "top-center",
      autoClose: 1000,
      theme: "dark",
      transition: Flip,
    });
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full h-[10vh] fixed z-40 top-0 bg-[#DBEDF7] shadow-md flex justify-between items-center px-6 md:px-10 transition-all duration-300">
        {/* Logo */}
        <h1 className="text-[2rem] md:text-[2.5rem] font-extrabold uppercase text-[#6A6CC7] underline hover:scale-105 transition-transform duration-300 cursor-pointer">
          DishLy
        </h1>

        {/* --- Hamburger for Mobile --- */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl text-[#6A6CC7]">
            <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
          </button>
        </div>

        {/* --- Navigation Links (Desktop) --- */}
        <ul className="hidden md:flex justify-evenly items-center gap-4 font-semibold px-4 py-2 rounded-full shadow-inner">
          {["/", "menu", "cart", "history"].map((path, idx) => (
            <li key={idx}>
              <NavLink
                to={path === "/" ? "/" : path}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#6A6CC7] px-3 py-1 rounded border-b-2 border-b-[#6A6CC7]"
                    : "text-[#6A6CC7] hover:text-[#6A6CC7]"
                }
              >
                {path === "/" ? "Home" : path === "history" ? "Orders" : path === "cart" ? (
                  <i className="fa-solid fa-cart-shopping relative">
                    <sup className="absolute -top-3 -right-3 bg-[#fa0606] text-white text-xs px-[6px] py-[1px] rounded-full shadow-md">
                      {cartItems.length}
                    </sup>
                  </i>
                ) : (
                  path.charAt(0).toUpperCase() + path.slice(1)
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* --- Login / Profile --- */}
        {!isLoged ? (
          <button
            onClick={() => dispatch(toggle())}
            className="hidden md:block bg-white text-[#6A6CC7] text-[0.9rem] px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-100 transition-all"
          >
            Login
          </button>
        ) : (
          <div className="hidden md:flex justify-center items-center gap-3 cursor-pointer">
            <img src={person} className="w-[45px] h-[45px] rounded-full" alt="profile" />
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

      {/* --- Mobile Menu --- */}
      {menuOpen && (
        <div className=" top-[10vh] fixed left-0 w-full h-full bg-[#DBEDF7] shadow-md flex flex-col items-center py-4 md:hidden z-30">
          {["/", "menu", "cart", "history"].map((path, idx) => (
            <NavLink
              key={idx}
              to={path === "/" ? "/" : path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-[#6A6CC7] py-2 font-semibold border-b-2 border-b-[#6A6CC7] w-full text-center"
                  : "text-[#6A6CC7] py-2 font-semibold hover:text-[#6A6CC7] w-full text-center"
              }
            >
              {path === "/" ? "Home" : path === "history" ? "Orders" : path === "cart" ? (
                <>
                  <i className="fa-solid fa-cart-shopping relative mr-2"></i>Cart ({cartItems.length})
                </>
              ) : (
                path.charAt(0).toUpperCase() + path.slice(1)
              )}
            </NavLink>
          ))}

          {!isLoged ? (
            <button
              onClick={() => {
                dispatch(toggle());
                setMenuOpen(false);
              }}
              className="mt-3 bg-white text-[#6A6CC7] text-[0.9rem] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Login
            </button>
          ) : (
            <div className="flex flex-col items-center gap-2 mt-3">
              <NavLink to="/profile"  onClick={() => {
                setMenuOpen(false);
              }}>
                <h1 className="text-[1rem] font-semibold capitalize underline" 
                onClick={()=>navigate("/profie")}
                 >
                  {curUser?.name || "User"}
                </h1>
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-white text-[#42457f] text-[0.9rem] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

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
