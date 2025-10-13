import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Menus = () => {
  // Dispatches
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isLoged = useSelector((state) => state.showLogin.isLog);

  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch recipes
  const fetchRecipes = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/recipes');
      setRecipes(response.data.recipes);
      setFilteredRecipes(response.data.recipes); // initial filtered list
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Filter recipes whenever search or cuisine changes
  useEffect(() => {
    let filtered = recipes;

    // Filter by cuisine
    if (cuisineFilter !== 'All') {
      filtered = filtered.filter(r => r.cuisine.toLowerCase() === cuisineFilter.toLowerCase());
    }

    // Filter by search
    if (search.trim() !== '') {
      filtered = filtered.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));
    }

    setFilteredRecipes(filtered);
  }, [search, cuisineFilter, recipes]);

  // Get unique cuisines for dropdown
  const cuisines = ['All', ...new Set(recipes.map(r => r.cuisine))];

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <h2 className="text-lg font-semibold mt-4 text-gray-600">Loading Recipes...</h2>
      </div>
    );
  }

  return (
    <div className="w-[90vw] mt-[13vh] mx-auto py-10">
      {/* ToastContainer placed at top level */}
      <ToastContainer />

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/2"
        />
        <select
          value={cuisineFilter}
          onChange={(e) => setCuisineFilter(e.target.value)}
          className="p-2 border rounded w-full md:w-1/4"
        >
          {cuisines.map((cuisine, index) => (
            <option key={index} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl shadow-md p-4 hover:scale-105 transition-transform cursor-pointer"
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h2 className="font-bold text-lg mb-1">{recipe.name}</h2>
            <p className="text-sm text-gray-600 mb-1">Cuisine: {recipe.cuisine}</p>
            <p className="text-sm text-gray-600 mb-1">Difficulty: {recipe.difficulty}</p>
            <p className="text-sm text-gray-600">Calories: {recipe.caloriesPerServing} kcal</p>
            <p className="text-sm text-gray-600">₹ 199</p>
            <button
              onClick={() => {
                if (!isLoged) {
                  // alert("No carted")
                  toast.warn('Please Login !', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                  });
                  
                } else{
                  dispatch(addToCart(recipe));
                }
              }}
              className="mt-3 cursor-pointer bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menus;
