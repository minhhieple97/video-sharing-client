import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Funny Movies
        </Link>
        <div>
          <Link to="/login" className="bg-blue-500 text-white px-4 py-1 rounded">
            Login / Register
          </Link>
        </div>
      </div>
    </header>
  );
};
