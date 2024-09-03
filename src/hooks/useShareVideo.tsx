import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shareVideo } from '../services/api';

export const useShareVideo = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await shareVideo(youtubeUrl);
      navigate('/');
    } catch (err: unknown) {
      setError(err as string);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    youtubeUrl,
    isLoading,
    error,
    handleInputChange,
    handleSubmit,
  };
};
