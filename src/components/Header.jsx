import React, { useState } from 'react';

export default function Header({ count, setCount, showCartLabel, setShowCartLabel }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const links = [
    { label: 'Collection', href: '#' },
    { label: 'Men', href: '#' },
    { label: 'Women', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <header className="flex justify-between items-center p-4 md:px-10 border-b border-gray-200 bg-white relative">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile menu icon */}
        <button
          className="md:hidden text-xl cursor-pointer"
          onClick={() => setShowMenu(true)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Logo */}
        <img src="/assets/logo.png" alt="logo" className="w-28" />

        {/* Navigation Links (Desktop) */}
        <ul className="hidden md:flex gap-6 ml-6 text-gray-600 font-medium">
          {links.map((el) => (
            <li key={el.label}>
              <a
                href={el.href}
                className="hover:text-amber-500 transition duration-200"
              >
                {el.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 relative">
        {/* Cart */}
        <div className="relative">
          <button
            className="relative"
            onClick={() => setShowCart((prev) => !prev)}
          >
            <img src="/assets/cart.png" alt="cart" className="w-6" />
            {showCartLabel && (
              <span className="absolute -top-2 -right-2 text-[10px] font-semibold text-white bg-red-500 rounded-full px-1.5">
                {count}
              </span>
            )}
          </button>

          {/* Cart Dropdown */}
          {showCart && (
            <div className="absolute right-0 mt-3 w-[92vw] max-w-[360px] bg-white rounded-lg shadow-xl border border-gray-100 p-4 animate-slideDown z-50">
              <h3 className="font-semibold text-gray-800 mb-3">Cart</h3>
              <hr className="mb-3" />

              {showCartLabel && count > 0 ? (
                <div className="flex flex-col gap-4">
                  {/* Cart Item */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col text-sm text-gray-700">
                      <span className="text-gray-600">Fall Limited Edition Sneakers</span>
                      <span>
                        $125.00 × {count}{' '}
                        <span className="font-bold text-gray-900">${count * 125}</span>
                      </span>
                    </div>

                    {/* Trash Icon */}
                    <button
                      onClick={() => {
                        setCount(0);
                        setShowCartLabel(false);
                      }}
                      className="text-red-500 hover:text-red-600 transition text-lg"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => {}}
                    className="bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 transition text-sm font-medium"
                  >
                    Checkout
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 text-sm text-center">Your cart is empty</p>
              )}
            </div>
          )}
        </div>

        {/* Profile */}
        <button className="border-2 border-transparent hover:border-amber-500 rounded-full transition">
          <img
            className="w-8 md:w-10 rounded-full"
            src="/assets/Oval.png"
            alt="profile"
          />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed top-0 left-0 z-50 w-full h-full bg-black/40 backdrop-blur-sm transition-all duration-300 ${
          showMenu ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="bg-white w-4/5 h-full p-6 shadow-lg relative">
          <button
            onClick={() => setShowMenu(false)}
            className="absolute top-4 text-2xl text-gray-600 hover:text-gray-900 transition cursor-pointer"
          >
            &times;
          </button>

          <ul className="flex flex-col gap-6 mt-12 text-gray-700 text-lg font-medium">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-amber-500 transition"
                  onClick={() => setShowMenu(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
