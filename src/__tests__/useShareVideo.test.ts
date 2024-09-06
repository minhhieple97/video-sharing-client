import { renderHook, act } from '@testing-library/react-hooks';
import { useNavigate } from 'react-router-dom';
import { useShareVideo } from '../hooks/useShareVideo';
import { shareVideo } from '../services/api';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../services/api', () => ({
  shareVideo: jest.fn(),
}));

describe('useShareVideo', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useShareVideo());

    expect(result.current.youtubeUrl).toBe('');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should update youtubeUrl on input change', () => {
    const { result } = renderHook(() => useShareVideo());

    act(() => {
      result.current.handleInputChange({
        target: { value: 'https://youtube.com/watch?v=123' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.youtubeUrl).toBe('https://youtube.com/watch?v=123');
    expect(result.current.error).toBeNull();
  });

  it('should handle successful video sharing', async () => {
    (shareVideo as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useShareVideo());

    act(() => {
      result.current.handleInputChange({
        target: { value: 'https://youtube.com/watch?v=123' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(shareVideo).toHaveBeenCalledWith('https://youtube.com/watch?v=123');
    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle error during video sharing', async () => {
    const errorMessage = 'Failed to share video';
    (shareVideo as jest.Mock).mockRejectedValue(errorMessage);

    const { result } = renderHook(() => useShareVideo());

    act(() => {
      result.current.handleInputChange({
        target: { value: 'https://youtube.com/watch?v=123' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(shareVideo).toHaveBeenCalledWith('https://youtube.com/watch?v=123');
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });
});
