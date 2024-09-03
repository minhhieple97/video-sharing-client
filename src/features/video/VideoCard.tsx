import { FC } from 'react';
import { Video } from '../../interfaces';

export const VideoCard: FC<Video> = ({ sharedAt, title, user, youtubeId }) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:gap-4 ">
      <div className="w-full sm:w-2/3">
        <div className="aspect-video mb-4">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="w-full sm:w-1/3">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          <span>{user.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          <span>{new Date(sharedAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
