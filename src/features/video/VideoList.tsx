import { VideoCard } from './VideoCard';
import { useVideos } from '../../hooks/useVideos';
import { FC } from 'react';
export const VideoList: FC = () => {
  const { loading, videos } = useVideos();
  return (
    <div className="space-y-8">
      <div>
        {videos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};
