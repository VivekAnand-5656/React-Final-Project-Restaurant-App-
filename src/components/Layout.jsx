import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <header><Navbar/></header>
        <main><Outlet/></main>
        <footer><Footer/></footer>
    </div>
  )
}

export default Layout