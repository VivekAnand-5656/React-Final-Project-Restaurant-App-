import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggle, isLogin, setUser, logoutUser, signupData, currUserName } from "../features/show";
import { motion } from "framer-motion";
import { Flip, Bounce, toast } from "react-toastify";
import person from "../images/person.png";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const shoLog = useSelector((state) => state.showLogin.isShow);
  const isLoged = useSelector((state) => state.showLogin.isLog);
  
  const curUserN = useSelector((state) => state.showLogin.userName);
  const [eye, setEye] = useState(false);
  const [eye2, setEye2] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //  Login Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!password || !email) {
      toast.error("Please fill all fields!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    const users = JSON.parse(localStorage.getItem("dishlyUser")) || [];
    const matchUser = users.find(
      (user) => user.email === email && user.password === password 
      
    );
    if (matchUser) {
      dispatch(setUser({ email, password }));
      dispatch(isLogin());
      dispatch(toggle());
      dispatch(setUser({
        name:matchUser.name,
        email:matchUser.email,
        phone:matchUser.mobile
      }))
      toast.success(`Welcome, ${matchUser.name} ! ✅`, {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Flip,
      });
      setFormData({ email: "", password: "" });
      dispatch(currUserName(matchUser.name));
    } else {
      toast.error("Invalid email or password! ❌", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Flip,
      });
    }
  };

  // 🔹 Signup Submit
  const handleSignup = (e) => {
    e.preventDefault();
    const { name, email, password, mobile } = formData;
    if (!name || !email || !password) {
      toast.error("Please fill all required fields!", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Flip,
      });
      return;
    }
    const existUsers = JSON.parse(localStorage.getItem("dishlyUser")) || [];
    const updateUser = [...existUsers, { name, email, password, mobile }];
    dispatch(signupData(updateUser));

    localStorage.setItem("dishlyUser", JSON.stringify(updateUser));
    toast.success("Signup successful! 🎉", {
      position: "top-center",
      autoClose: 2000,
      theme: "dark",
      transition: Flip,
    });
    setShowSignup(false);
    setFormData({ email: "", name: "", mobile: "", password: "" });
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
      {/* Navbar */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-[#DBEDF7] shadow-md flex items-center justify-between px-5 py-3">
        <h1
          onClick={() => navigate("/")}
          className="text-[1.8rem] font-extrabold uppercase text-[#6A6CC7] underline cursor-pointer"
        >
          DishLy
        </h1>

        {/* Hamburger */}
        <button
          className="text-3xl text-[#6A6CC7] md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
        </button>

        {/* Menu Links */}
        <ul
          className={`flex flex-col md:flex-row absolute md:static bg-[#DBEDF7] w-full md:w-auto left-0 top-[65px] md:top-auto transition-all duration-300 ease-in-out overflow-hidden ${
            menuOpen ? "max-h-[300px] py-3" : "max-h-0 md:max-h-none"
          } md:py-0 justify-center items-center gap-5 font-semibold text-[#6A6CC7]`}
        >
          {["/", "menu", "cart", "history"].map((path, idx) => (
            <li key={idx} onClick={() => setMenuOpen(false)}>
              <NavLink
                to={path === "/" ? "/" : path}
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-[#6A6CC7] pb-1"
                    : "hover:text-[#42457f]"
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

          {/* Login / Profile */}
          {!isLoged ? (
            <button
              onClick={() => {
                dispatch(toggle());
                setMenuOpen(false);
              }}
              className="bg-white text-[#6A6CC7] text-[0.9rem] px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Login
            </button>
          ) : (
            <div className="flex justify-center items-center gap-2">
              <img src={person} className="w-[40px] h-[40px] rounded-full" alt="profile" />
              <NavLink to="profile">
                <h1 className="text-[1rem] font-semibold capitalize underline">
                  {curUserN || "User"}{" "}
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
        </ul>
      </nav>

      {/* Modal (Login / Signup) */}
      {shoLog && (
        <motion.div
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

            {/* Toggle between Login & Signup */}
            {!showSignup ? (
              <>
                <h2 className="text-2xl font-bold text-center text-[#44427f] mb-4 mt-6">
                  Login to <span className="text-[#0b00a6]">DishLy</span>
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 p-2 focus:ring-2 focus:ring-[#6567BE]"
                  />
                  <div className="flex justify-between items-center w-full border border-gray-300 rounded-lg p-2">
                    <input
                      type={eye ? "text" : "password"}
                      name="password"
                      placeholder="Enter your Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-[90%] focus:ring-3 focus:ring-[#6567BE] outline-0 rounded p-2"
                    />
                    <p
                      onClick={() => setEye(!eye)}
                      className="text-[1rem] cursor-pointer"
                    >
                      {eye ? "🔒" : "👁️"}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-[#6567BE] text-white py-2 rounded-lg font-semibold shadow-md hover:bg-[#5557AE] transition"
                  >
                    Login
                  </motion.button>
                </form>
                <p className="text-center text-sm mt-3">
                  New to DishLy?{" "}
                  <span
                    onClick={() => setShowSignup(true)}
                    className="text-[#0615bb] cursor-pointer font-semibold"
                  >
                    Register here!
                  </span>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-center text-[#44427f] mb-4 mt-6">
                  Create Your <span className="text-[#0b00a6]">DishLy</span> Account
                </h2>
                <form onSubmit={handleSignup} className="flex flex-col gap-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#6567BE]"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#6567BE]"
                  />
                  <div className="flex justify-between items-center w-full border border-gray-300 rounded-lg p-2">
                    <input
                      type={eye2 ? "text" : "password"}
                      name="password"
                      placeholder="Enter your Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-[90%] focus:ring-3 focus:ring-[#6567BE] outline-0 rounded p-2"
                    />
                    <p
                      onClick={() => setEye2(!eye2)}
                      className="text-[1rem] cursor-pointer"
                    >
                      {eye2 ? "🔒" : "👁️"}
                    </p>
                  </div>
                  <input
                    type="number"
                    name="mobile"
                    placeholder="Mobile (optional)"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#6567BE]"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-[#6567BE] text-white py-2 rounded-lg font-semibold shadow-md hover:bg-[#5557AE] transition"
                  >
                    Sign Up
                  </motion.button>
                </form>
                <p className="text-center text-sm mt-3">
                  Already have an account?{" "}
                  <span
                    onClick={() => setShowSignup(false)}
                    className="text-[#0615bb] cursor-pointer font-semibold"
                  >
                    Login here!
                  </span>
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
