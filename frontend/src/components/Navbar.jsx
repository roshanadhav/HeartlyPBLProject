"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const router = useRouter();
  const { isLoggedIn, userData, logout } = useContext(AppContext);

  const logoutUser = async () => {
    try {
      const response = await axios.post(
        `https://safetyfyapp.onrender.com/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      const data = response.data;
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    logout();
  };

  return (
    <nav className="w-full  bg-black backdrop-blur-md fixed top-0 z-50 right-0">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center p-4 sm:px-8 w-full">
        <Link href="/">
          <div className="flex items-center">
            <img
              src="/green-heart-with-leaf-outline_78370-2744-removebg-preview.png"
              alt="Logo"
              className="h-14"
            />
            <h1 className="ml-2 text-white text-2xl font-bold font-mono tracking-wide">Heartly</h1>
          </div>
        </Link>

        <div className="flex">
          {/* Desktop Menu */}
          <ul className="hidden mr-12 md:flex items-center gap-6 text-white font-medium">
            <li className="hover:text-gray-300 transition-all">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-gray-300 transition-all">
              <Link href="/about">About</Link>
            </li>
            <li className="relative">
              <button
                className="flex items-center gap-1 hover:text-gray-300 transition-all"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services <ChevronDown size={16} />
              </button>
              {servicesOpen && (
                <ul className="absolute left-0 mt-2 bg-gray-800 text-white shadow-lg rounded-lg w-56 overflow-hidden">
                  <li className="px-4 py-2 hover:bg-gray-700">
                    <Link href="/services/female-safety">Female Safety</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700">
                    <Link href="/data-management">Child Safety</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700">
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="hover:text-gray-300 transition-all">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>

          {/* Profile / Login */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <div className="relative">
                <User
                  className="text-white cursor-pointer"
                  size={30}
                  onClick={() => setShowProfilePopup(!showProfilePopup)}
                />
                {showProfilePopup && userData && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800 text-white shadow-lg rounded-lg p-4 z-50">
                    <p className="text-lg font-semibold">{userData.name}</p>
                    <p className="text-sm text-gray-400">{userData.email}</p>

                    {userData && !userData.isEmailVerified ? (
                      <a
                        onClick={verifyEmail}
                        href="/verify-email"
                        className="text-blue-400 hover:text-blue-600 font-medium transition duration-200 underline mt-2 inline-block"
                      >
                        Verify Email
                      </a>
                    ) : (
                      <span className="text-green-400 font-medium">Verified</span>
                    )}

                    <button
                      onClick={logoutUser}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition mt-4"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="border border-gray-400 rounded-full px-10 py-1 text-white hover:bg-gray-700 transition-all"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <button
          className="md:hidden flex items-center text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-900 w-full p-4 shadow-md">
          <ul className="flex flex-col gap-4 text-white">
            <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link href="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            <li>
              <button onClick={() => setServicesOpen(!servicesOpen)} className="flex items-center">
                Services <ChevronDown size={16} />
              </button>
            </li>
            {servicesOpen && (
              <ul className="ml-4">
                <li><Link href="/excel">Female Safety</Link></li>
                <li><Link href="/data-management">Child Safety</Link></li>
                <li><Link href="/dashboard">Dashboard</Link></li>
              </ul>
            )}
            <li>
              {isLoggedIn ? (
                <button onClick={() => setShowProfilePopup(!showProfilePopup)} className="flex items-center">
                  Profile
                </button>
              ) : (
                <button onClick={() => router.push("/login")} className="border border-gray-400 rounded-full px-4 py-1">
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
