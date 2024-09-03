import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaShareAlt, FaBars } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { SlideOutMenu } from './SlideOutMenu';
import { useLogout } from '../../hooks/useLogout';
import { useSocketContext } from '../../hooks/useSocketContext';
import { Notification } from '../../features/notification/Notification';
import { INotification, INotificationFromServer } from '../../interfaces';

export const Header: React.FC = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useLogout();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { socket, isConnected } = useSocketContext();
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const removeNotification = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id),
    );
  };
  useEffect(() => {
    const onShareVideo = (data: INotificationFromServer) => {
      const newNotification: INotification = {
        id: Date.now().toString(),
        email: data.email,
        title: data.title,
      };
      setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    };
    if (isConnected) {
      socket?.on('share_video', onShareVideo);
    }
    return () => {
      socket?.off('share_video', onShareVideo);
    };
  }, [isConnected, socket]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (notifications.length > 0) {
        removeNotification(notifications[notifications.length - 1].id);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [notifications]);
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
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-sm z-50 max-h-screen overflow-y-auto">
        {notifications.map((notification) => (
          <Notification key={notification.id} data={notification} onClose={removeNotification} />
        ))}
      </div>
    </header>
  );
};
