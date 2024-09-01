import React from 'react';
import { VideoPlayer } from './VideoPlayer';

export const VideoList: React.FC = () => {
  const videos = [
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Never Gonna Give You Up',
      sharedBy: 'user1@example.com',
      description: 'The classic 1987 Rick Astley hit that became an internet phenomenon.',
    },
    {
      videoId: '9bZkp7q19f0',
      title: 'PSY - GANGNAM STYLE',
      sharedBy: 'user2@example.com',
      description: 'The viral K-pop sensation that took the world by storm in 2012.',
    },
    {
      videoId: 'kJQP7kiw5Fk',
      title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
      sharedBy: 'user3@example.com',
      description: 'The record-breaking Latin pop hit that dominated charts worldwide.',
    },
  ];

  return (
    <div>
      {videos.map((video, index) => (
        <VideoPlayer key={index} {...video} />
      ))}
    </div>
  );
};
