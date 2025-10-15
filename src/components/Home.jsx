import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast, Flip } from 'react-toastify'

import front2 from '../images/front2.jpg'
import front1 from '../images/front1.jpeg'
import front3 from '../images/front3.jpeg'
import pizza from '../images/pizza.png'
import burger from '../images/burger.png'
import drink from '../images/drink.png'
import desert from '../images/desert.png'
import restu from '../images/restu.jpeg'
import pr1 from '../images/pr1.png'
import pr2 from '../images/pr2.png'
import pr3 from '../images/pr3.png'
import pr4 from '../images/pr4.png'

const Home = () => {
  const navigate = useNavigate();
  const [pic,setPic] = useState(front1);

  let ftr = [
    { img: pizza, title: "Pizza" },
    { img: burger, title: "Burger" },
    { img: drink, title: "Drinks" },
    { img: desert, title: "Dessert's" }
  ];

  let testimonial = [
    { name: "Aisha Khan", pic: pr1, cmt: "“The Margherita pizza here is absolutely amazing — crispy base and fresh cheese. Delivery was fast and packaging was perfect!” " },
    { name: "Rohit Sharma", pic: pr2, cmt: "“Loved the fries and burgers! Easy to order and super quick delivery. Customer service was also polite and responsive.”" },
    { name: "Sneha Patel", pic: pr3, cmt: "“I tried their cold coffee and desserts combo — totally worth it! Perfectly sweet and beautifully packed.”" },
    { name: "Aman Verma", pic: pr4, cmt: "“Great portion sizes and everything tastes fresh. The online ordering process is smooth and simple.”" },
  ];

  const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: "easeOut" } }
  });

  const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="overflow-hidden">
      {/* --- Hero Section --- */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="w-full min-h-[80vh] mt-[10vh] bg-[#DBEDF7] flex flex-col md:flex-row justify-center items-center"
      >
        <motion.div variants={fadeIn(0.2)} className="w-[90%] md:w-[50%] flex flex-col justify-center p-5 text-center md:text-left">
          <motion.h1 className="text-[2.5rem] md:text-[4rem] font-bold font-serif leading-tight">
            Delicious Food, Delivered Fast!
          </motion.h1>
          <motion.p variants={fadeIn(0.3)} className="mt-2 text-gray-700 text-lg">
            Order your favorite dishes from the comfort of your home.
          </motion.p>
          <motion.button
            variants={fadeIn(0.4)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/menu")}
            className="bg-[#0206ff] px-1 py-3 md:w-[30%] rounded-3xl text-white font-semibold cursor-pointer mt-4 mx-auto md:mx-0"
          >
            View Menu
          </motion.button>
        </motion.div>

        <motion.div
          variants={fadeIn(0.4)}
          className="right  w-[80%] md:w-[40%] flex justify-center gap-2 bg-blue-800 p-2 items-center mt-6 md:mt-0   "
        >
          <motion.img
            src={pic}
            alt="Dishly"
            className="w-[70%] h-auto rounded-full shadow-lg"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />
          <div className=' w-[10%] h-full bg-[#ffffff5e] p-2 flex flex-col gap-3 rounded-2xl ' >
            <img 
            onClick={()=>setPic(front1)}
             className=' rounded-[50%] w-full h-[35%] cursor-pointer '  src={front1} alt="" />
            <img  
            onClick={()=>setPic(front2)}
            className=' rounded-[50%] w-full h-[35%] cursor-pointer ' src={front2} alt="" />
            <img 
            onClick={()=>setPic(front3)}
            className=' rounded-[50%] w-full h-[35%] cursor-pointer ' src={front3} alt="" />
          </div>
        </motion.div>
      </motion.div>

      {/* --- Features Section --- */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-full flex flex-wrap justify-center items-center gap-5 py-10 px-4 bg-[#F9FAFB]"
      >
        {ftr.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeIn(i * 0.2)}
            whileHover={{ scale: 1.08 }}
            className="w-[45%] sm:w-[30%] md:w-[18%] bg-[#DBEDF7] shadow-md flex flex-col justify-around items-center p-4 rounded-xl cursor-pointer transition-all duration-500"
          >
            <img src={item.img} alt={item.title} className="w-[70%] h-auto" />
            <h1 className="text-[1.2rem] font-semibold uppercase">{item.title}</h1>
            <motion.button whileHover={{ scale: 1.1 }} className="bg-[#6A6CC7] px-3 py-1 rounded text-white font-semibold mt-2">
              Explore
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* --- About Section --- */}
      <motion.div id="about" variants={fadeIn(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }} className="w-[90vw] mx-auto py-12 flex flex-col md:flex-row items-center gap-10">
        <motion.div variants={fadeIn(0.3)} className="w-full md:w-1/2">
          <img src={restu} alt="Restaurant" className="w-full rounded-2xl shadow-lg object-cover" />
        </motion.div>

        <motion.div variants={fadeIn(0.4)} className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            About <span className="text-[#6A6CC7]">Our Restaurant</span>
          </h2>
          <p className="text-gray-600 mb-4">
            Welcome to <span className="font-semibold text-gray-800">Dishly</span>, your go-to destination for delicious meals and quick online ordering.
          </p>
          <p className="text-gray-600 mb-6">
            Whether you’re craving pizza, burgers, or desserts — we’ve got something for everyone.
          </p>
          <motion.button whileHover={{ scale: 1.1 }} onClick={() => navigate("/menu")} className="bg-[#6A6CC7] hover:bg-blue-700 cursor-pointer text-white font-semibold px-6 py-2 rounded-full transition-all duration-300">
            Explore Menu
          </motion.button>
        </motion.div>
      </motion.div>

      {/* --- Testimonials --- */}
      <motion.div variants={fadeIn(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <h1 className="text-center font-bold text-[2rem] md:text-[2.5rem]">What our customers say</h1>
        <div className="w-[90vw] mx-auto py-10 overflow-x-auto">
          <div className="flex gap-6 snap-x snap-mandatory overflow-x-scroll px-4">
            {testimonial.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                variants={fadeIn(index * 0.2)}
                className="min-w-[250px] md:min-w-[300px] bg-[#E8F5E9] shadow-md hover:shadow-lg rounded-2xl p-5 flex flex-col items-center text-center snap-center"
              >
                <img src={item.pic} alt={item.name} className="w-[90px] h-[90px] rounded-full object-cover border-4 border-white shadow-md mb-3" />
                <h1 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h1>
                <p className="text-sm text-gray-600 italic">{item.cmt}</p>
                <div className="mt-3 flex text-yellow-500">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* --- Contact Section --- */}
      <motion.div id="contact" variants={fadeIn(0.3)} initial="hidden" whileInView="show" viewport={{ once: true }} className="w-[90vw] mx-auto py-12 flex flex-col gap-10">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Get in <span className="text-blue-600">Touch</span>
        </h2>
        <motion.div variants={staggerContainer} className="flex flex-col md:flex-row gap-10">
          <motion.div variants={fadeIn(0.2)} className="md:w-1/2 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <i className="fa-solid fa-location-dot text-blue-600 text-2xl"></i>
              <p className="text-gray-600">123 Foodie St, City, Country</p>
            </div>
            <div className="flex items-center gap-4">
              <i className="fa-solid fa-phone text-blue-600 text-2xl"></i>
              <p className="text-gray-600">+91 9876543210</p>
            </div>
            <div className="flex items-center gap-4">
              <i className="fa-solid fa-envelope text-blue-600 text-2xl"></i>
              <p className="text-gray-600">support@dishly.com</p>
            </div>
          </motion.div>

          <motion.div variants={fadeIn(0.3)} className="md:w-1/2 bg-[#E8F5E9] p-6 rounded-2xl shadow-md">
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success('Your message sent successfully ✅', {
                  position: "top-right",
                  autoClose: 2000,
                  theme: "light",
                  transition: Flip,
                });
              }}
            >
              <input type="text" name="name" placeholder="Your Name" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" />
              <input type="email" placeholder="Your Email" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" />
              <textarea placeholder="Your Message" rows="4" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
              <motion.button whileHover={{ scale: 1.05 }} type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300">
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Home
