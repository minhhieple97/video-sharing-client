import React from 'react';

interface VideoPlayerProps {
  title: string;
  sharedBy: string;
  description: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ title, sharedBy, description }) => {
  return (
    <div className="mb-8">
      <div className="bg-gray-200 h-64 mb-4"></div>
      <div className="flex items-center mb-2">
        <button className="mr-2">Play</button>
        <div className="flex-grow bg-gray-300 h-2 rounded"></div>
        <button className="ml-2">Fullscreen</button>
      </div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm text-gray-600">Shared by: {sharedBy}</p>
      <p className="mt-2">{description}</p>
    </div>
  );
};
