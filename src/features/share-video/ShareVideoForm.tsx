import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaYoutube, FaShare } from 'react-icons/fa';

const ShareVideoForm: React.FC = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement video sharing logic here
    console.log('Sharing video:', youtubeUrl);
    // After successful submission, redirect to home page
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-red-500 to-pink-500 p-4">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <FaYoutube className="mr-2" /> Share a YouTube Video
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-4">
          <label htmlFor="youtubeUrl" className="block text-gray-700 text-sm font-bold mb-2">
            YouTube URL
          </label>
          <input
            id="youtubeUrl"
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            required
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-100 focus:border-red-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
        >
          <FaShare className="mr-2" /> Share Video
        </button>
      </form>
    </div>
  );
};

export default ShareVideoForm;
