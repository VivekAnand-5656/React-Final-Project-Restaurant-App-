import { useState } from 'react' 
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Menu from './components/Menus'
import Cart from './components/Carts'
import History from './components/History'
import Profile from './components/Profile'
// import Signup from './components/Signup'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 

function App() {
  return <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>} >
        <Route index element={<Home/>} />
        <Route path='menu' element={<Menu/>} />
        <Route path='cart' element={<Cart/>} />
        <Route path='history' element={<History/>} /> 
        <Route path='profile' element={<Profile/>} /> 
        {/* <Route path='signup' element={<Signup/>} /> */}
      </Route>
    </Routes>
    </BrowserRouter>
    <ToastContainer limit={1} />
  </>
}

export default App
