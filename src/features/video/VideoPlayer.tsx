import React from 'react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  sharedBy: string;
  description: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  title,
  sharedBy,
  description,
}) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:gap-4">
      <div className="w-full sm:w-2/3">
        <div className="aspect-video mb-4">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="w-full sm:w-1/3">
        <h2 className="text-xl font-bold truncate">{title}</h2>
        <p className="text-sm text-gray-600">Shared by: {sharedBy}</p>
        <p className="mt-2 line-clamp-3 sm:line-clamp-none">{description}</p>
      </div>
    </div>
  );
};
