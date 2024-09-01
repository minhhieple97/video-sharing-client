import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaShareAlt, FaBell, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useLogout } from '../../hooks/useLogout';

interface SlideOutMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SlideOutMenu: React.FC<SlideOutMenuProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { logout } = useLogout();
  return (
    <div
      className={`fixed top-0 right-0 h-full  bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 flex flex-col h-full">
        <button onClick={onClose} className="self-end text-gray-500 hover:text-gray-700 mb-4">
          <FaTimes className="text-2xl" />
        </button>
        <div className="flex-grow flex flex-col">
          {user ? (
            <>
              <div className="flex items-center space-x-2 mb-6">
                <FaUserCircle className="text-xl text-gray-600" />
                <span className="text-sm font-medium text-gray-800">{user.email}</span>
              </div>
              <Link
                to="/share"
                className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300 mb-4"
                onClick={onClose}
              >
                <FaShareAlt className="mr-2" />
                <span>Share a movie</span>
              </Link>
              <button className="flex items-center text-left text-gray-700 hover:text-gray-900 transition duration-300 mb-4">
                <FaBell className="mr-2" />
                <span>Notifications</span>
              </button>
              <button
                onClick={logout}
                className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300 mt-auto"
              >
                <FaSignOutAlt className="mr-2" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 mt-auto"
              onClick={onClose}
            >
              <span>Login / Register</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
