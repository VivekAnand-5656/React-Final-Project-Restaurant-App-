import React from 'react'

const Footer = () => {
  return <>
  {/* --- Footer --- */}
<div className="bg-green-600 text-white mt-12">
  <div className="w-[85vw] mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* About */}
    <div>
      <h2 className="text-xl font-bold mb-4">About Dishly</h2>
      <p className="text-sm">
        Dishly is your go-to destination for delicious meals delivered fast. Fresh ingredients, tasty food, and excellent service every time!
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h2 className="text-xl font-bold mb-4">Quick Links</h2>
      <ul className="space-y-2">
        <li><a href="/" className="hover:text-gray-300">Home</a></li>
        <li><a href="/menu" className="hover:text-gray-300">Menu</a></li>
        <li><a href="/about" className="hover:text-gray-300">About</a></li>
        <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h2 className="text-xl font-bold mb-4">Contact</h2>
      <p className="text-sm">123 Foodie St, City, Country</p>
      <p className="text-sm">+91 9876543210</p>
      <p className="text-sm">support@dishly.com</p>
      <div className="flex gap-4 mt-4">
        <a href="#" className="hover:text-gray-300"><i className="fa-brands fa-facebook"></i></a>
        <a href="#" className="hover:text-gray-300"><i className="fa-brands fa-instagram"></i></a>
        <a href="#" className="hover:text-gray-300"><i className="fa-brands fa-twitter"></i></a>
      </div>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="bg-green-700 text-center py-4 text-sm">
    &copy; {new Date().getFullYear()} Dishly. All rights reserved.
  </div>
</div>

  </>
}

export default Footer