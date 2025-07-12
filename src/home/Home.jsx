// src/home/Dashboard.jsx
import React, { useState } from 'react';
import tractor2 from "../assets/tractor2.png";
import tractor from "../assets/tractor.jpg"
import seeds from "../assets/seeds.jpg";
import fertilizers from "../assets/dap.jpeg";
import tools from "../assets/tools.jpg";

import {
  FaHome,
  FaUser,
  FaBars,
  FaEllipsisH,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaShoppingCart
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currsearch, setsearch] = useState('');

  const handlesearch = () => {
    if (!currsearch.trim()) return;
    navigate(`/search?query=${encodeURIComponent(currsearch)}`);
  };

  return (
    <div className='h-screen w-screen bg-amber-100 rounded-lg flex'>
      {/* Sidebar */}
      <div className="w-80 h-full bg-white rounded-b-lg border-r-2 border-t border-gray-500 group relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  transition-all duration-700 ease-in-out 
                  group-hover:top-[90%]">
          <img src={tractor} alt="tractor" className="w-60" />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-full
                  flex flex-col items-center 
                  transition-all duration-700 ease-in-out
                  opacity-0 translate-y-10 
                  group-hover:opacity-100 group-hover:translate-y-0
                  pointer-events-none group-hover:pointer-events-auto
                  space-y-6 pt-10">
          {/* Sidebar Buttons */}
          {[
            { icon: <FaHome />, path: "/home", label: "Home" },
            { icon: <FaUser />, path: "/you", label: "You" },
            { icon: <FaBars />, path: "/menu", label: "Menu" },
            { icon: <FaEllipsisH />, path: "/more", label: "More" },
            { icon: <FaQuestionCircle />, path: "/help", label: "Help" },
            { icon: <FaCog />, path: "/settings", label: "Settings" },
          ].map(({ icon, path, label }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`relative h-10 w-full flex items-center justify-center space-x-2 hover:text-green-700 bg-gray-300 rounded-3xl ${
                location.pathname === path
                  ? "before:content-[''] before:absolute before:left-2 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-red-600 before:rounded-full"
                  : ""
              }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}

          <button
            className="h-10 w-full flex items-center justify-center space-x-2 hover:text-red-700 bg-gray-300 rounded-3xl"
            onClick={() => navigate("/login", { replace: true })}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Right Side (Main Area) */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-20 w-full bg-green-300 rounded-tr-lg flex items-center justify-between px-6">
          <div>
            <div className="text-3xl font-bold">AgriTech</div>
            <div className="text-sm text-gray-800 font-bold mt-1">Making farming easy</div>
          </div>

          <div className='flex'>
            <div className='bg-gray-200 h-10 w-10 rounded-l-lg flex items-center justify-center'>
              <FaShoppingCart />
            </div>
            <input
              type="text"
              placeholder='Explore your requirements'
              value={currsearch}
              onChange={(e) => setsearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlesearch()}
              className='bg-gray-200 outline-none w-80 h-10'
            />
            <div className='bg-gray-200 h-10 w-10 rounded-r-lg flex items-center justify-center'>
              <button
                className='transition-transform duration-150 active:scale-90 active:text-green-700'
                onClick={handlesearch}
              >
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="relative group">
            <button
              className="p-2 border border-gray-600 rounded-lg"
              onClick={() => navigate("/cart")}
            >
              <FaShoppingCart className="text-4xl text-gray-600 transition-transform duration-300 active:text-red-700 group-hover:scale-110" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 
                bg-gray-800 text-white text-sm px-3 py-1 rounded 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 
                pointer-events-none z-10 whitespace-nowrap">
              Go to cart
            </div>
          </div>
        </div>

       <div className="flex-1 p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 overflow-y-auto">
  {[ 
    { src: tractor2, label: "Tractor" },
    { src: seeds, label: "Seeds" },
    { src: fertilizers, label: "Fertilizers" },
    { src: tools, label: "Tools" },
  ].map((item, index) => (
    <button
      key={index}
      onClick={() => navigate(`/search?query=${encodeURIComponent(item.label)}`)}
      className="bg-white shadow-md rounded-xl p-4 hover:scale-105 transition-transform flex flex-col items-center"
    >
      <img src={item.src} alt={item.label} className="w-full h-40 object-contain" />
      <h2 className="text-center mt-2 font-semibold text-green-700">{item.label}</h2>
    </button>
  ))}
</div>

      </div>
    </div>
  );
}
