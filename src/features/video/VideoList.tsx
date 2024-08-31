import React from 'react';
import { VideoPlayer } from './VideoPlayer';

export const VideoList: React.FC = () => {
  const videos = [
    {
      title: 'Funny Cat Video',
      sharedBy: 'user1@example.com',
      description: 'A hilarious compilation of cat fails.',
    },
    {
      title: 'Epic Prank Compilation',
      sharedBy: 'user2@example.com',
      description: 'The best pranks of 2023.',
    },
    {
      title: 'Stand-up Comedy Special',
      sharedBy: 'user3@example.com',
      description: 'A side-splitting performance by a rising star.',
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
