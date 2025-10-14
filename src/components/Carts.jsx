// src/pages/Cart.jsx
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity,orderConfirm } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom'; 
import { toast,Flip,Bounce } from 'react-toastify';

function Carts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); // cart items in this 

  const handling = 2;
  const totalPrice = cartItems.reduce((sum, item) => sum + 199 * item.quantity, 0);
  const grandTotal = useCallback(() => {
    return totalPrice + handling;
  }, [totalPrice]);

  return (
    <div className="w-[100vw] h-[87vh] mt-[13vh] mx-auto p-2">
      <h1 className="text-[1.5rem] font-bold">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className=' flex flex-col justify-center items-center '>
          <p className="text-gray-600 text-center ">Your cart is empty.</p>
          <button
            className="mt-3 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => navigate("/menu")}
          >Explore Menu</button>
        </div>
      ) : (
        <>
          <div className=' w-full h-full flex justify-between   '>
            <div className="w-[70%] h-[auto] flex flex-wrap overflow-scroll  gap-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-[#DBEDF7] w-[40%] flex items-center gap-2  rounded-xl shadow-md p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[30%] h-[50%] object-cover rounded-lg mb-3" />
                  <div className=' flex flex-col '>
                    <h2 className="font-bold text-lg mb-1">{item.name}</h2>
                    <p className="text-sm text-gray-600 mb-1">Cuisine: {item.cuisine}</p>
                    <p className="text-sm text-gray-600 mb-1 font-semibold">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-600 font-semibold">₹ {199 * item.quantity}</p>

                    <div className='w-full flex justify-around items-center mt-3'>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                      >
                        Remove
                      </button>

                      <div className='flex items-center gap-2'>
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className='bg-[#c9c6c6] font-semibold py-1 px-2 cursor-pointer rounded'
                        >
                          ➖
                        </button>
                        <span className="font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className='bg-[#c9c6c6] font-semibold py-1 px-2 cursor-pointer rounded'
                        >
                          ➕
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* --- Total Section--- */}
            <div className=" w-[30%] h-[60vh] bg-[#DBEDF7]  flex flex-col p-2 gap-3 ">
              <h1 className=' text-[1.2rem] font-bold  '>Bill Details</h1>
              <div className=' flex justify-between items-center '>
                <p>Total Items ({cartItems.length})</p>
                <h2 className="text-xl font-semibold">Total: ₹ {totalPrice}</h2>
              </div>
              <div className=' flex justify-between '>
                <p> <i class="fa-solid fa-truck"></i> Delievery Charges</p>
                <p className=' text-[#050bb5] '>FREE</p>
              </div>
              <div className=' flex justify-between '>
                <p> <i class="fa-solid fa-bag-shopping"></i> Handling Charges</p>
                <p>₹ {handling}</p>
              </div>
              <div className=' flex justify-between '>
                <h1>Grand Total </h1>
                <h1 className=' text-[1.2rem] text-[#fc3434] font-bold '>₹ {grandTotal()}</h1>
              </div>
              <button
                // onClick={() => dispatch(clearCart())}
                onClick={() => {
                  toast.success('Order Placed Successfully!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                  });
                  dispatch(orderConfirm());
                }}
                className="bg-[#6A6CC7] font-semibold text-white px-6 py-2 rounded hover:bg-gray-900 transition cursor-pointer "
              >
                Place Order
              </button>

              <button
                onClick={() => dispatch(clearCart())}
                className="bg-gray-800 cursor-pointer text-white px-6 py-2 rounded hover:bg-gray-900 transition"
              >
                Clear Cart
              </button>
            </div> 
          </div>
        </>
      )}
    </div>
  );
}

export default Carts;
