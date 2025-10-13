import { useState } from 'react' 
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Menu from './components/Menus'
import Cart from './components/Carts'
import History from './components/History'
import Profile from './components/Profile'
 

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
      </Route>
    </Routes>
    </BrowserRouter>
  </>
}

export default App
