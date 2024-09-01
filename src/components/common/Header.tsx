import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaUserCircle, FaSignOutAlt, FaShareAlt, FaBars } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { SlideOutMenu } from './SlideOutMenu';
import { useLogout } from '../../hooks/useLogout';

export const Header: React.FC = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { logout } = useLogout();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="mr-2">🎬</span> Funny Movies
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <FaUserCircle className="text-xl" />
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                <Link
                  to="/share"
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-full transition duration-300 flex items-center"
                >
                  <FaShareAlt className="mr-2" />
                  Share a movie
                </Link>
                <button className="text-white hover:text-yellow-300 transition duration-300">
                  <FaBell className="text-xl" />
                </button>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-full transition duration-300 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-white text-blue-500 hover:bg-blue-100 px-4 py-2 rounded-full transition duration-300"
              >
                Login / Register
              </Link>
            )}
          </div>
          {user ? (
            <button className="md:hidden text-white" onClick={toggleMenu}>
              <FaBars className="text-2xl" />
            </button>
          ) : (
            <Link
              to="/auth"
              className="bg-white text-blue-500 hover:bg-blue-100 px-4 py-2 rounded-full transition duration-300 md:hidden"
            >
              Login / Register
            </Link>
          )}
        </div>
      </div>
      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};
