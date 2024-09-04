import { useCallback, useEffect, useRef, useState } from 'react';
import { getVideos } from '../services/api';
import { Video } from '../interfaces';
import debounce from 'lodash/debounce';
import { DEFAULT_DELAY, DEFAULT_SKIP, DEFAULT_TAKE } from '../constants';
export const useVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [skip, setSkip] = useState<number>(DEFAULT_SKIP);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [lastFetchedSkip, setLastFetchedSkip] = useState<number>(-1);
  const hasMoreRef = useRef<boolean>(true);
  const fetchVideos = useCallback(async () => {
    if (loading || skip === lastFetchedSkip || !hasMoreRef.current || error) {
      return;
    }
    setLoading(true);
    try {
      const videosData = await getVideos(skip, DEFAULT_TAKE);
      const newVideos = videosData;
      setVideos((prevVideos) => [...prevVideos, ...newVideos]);
      setLastFetchedSkip(skip);
      if (newVideos.length < DEFAULT_TAKE) {
        hasMoreRef.current = false;
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }, [skip, loading, lastFetchedSkip, error]);
  console.log(videos, skip, lastFetchedSkip, loading);
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleScroll = useCallback(() => {
    const scrollThreshold = 5;
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const bottomPosition = document.documentElement.offsetHeight;

    if (bottomPosition - scrollPosition <= scrollThreshold && !loading) {
      setSkip((prevSkip) => prevSkip + DEFAULT_TAKE);
    }
  }, [loading]);
  const debouncedHandleScroll = debounce(handleScroll, DEFAULT_DELAY);

  useEffect(() => {
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      debouncedHandleScroll.cancel();
    };
  }, [debouncedHandleScroll]);

  return { videos, loading };
};
