import { renderHook, act } from '@testing-library/react';
import { getVideos } from '../services/api';
import { useVideos } from '../hooks/useVideos';
import { DEFAULT_TAKE, DEFAULT_SKIP } from '../constants';
import { Video, User } from '../interfaces';
import debounce from 'lodash/debounce';

jest.mock('../services/api');
type MockDebounce = jest.Mock & {
  mockReturnValue: jest.Mock & {
    cancel: jest.Mock;
  };
};

jest.mock('lodash/debounce', () => {
  return jest.fn().mockImplementation((fn) => {
    const mockDebouncedFn = jest.fn(fn) as jest.Mock & { cancel: jest.Mock };
    mockDebouncedFn.cancel = jest.fn();
    return mockDebouncedFn;
  }) as MockDebounce;
});

describe('useVideos hook', () => {
  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    token: 'mock-token',
  };

  const createMockVideo = (id: number): Video => ({
    id,
    youtubeId: `youtube-${id}`,
    title: `Test Video ${id}`,
    sharedAt: new Date().toISOString(),
    user: mockUser,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    window.scrollTo = jest.fn();
    (debounce as jest.Mock).mockClear();

    Object.defineProperty(document, 'documentElement', {
      writable: true,
      value: {
        scrollTop: 0,
        offsetHeight: 1000,
      },
    });

    // Mock window.innerHeight
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      value: 500,
    });
  });

  it('should fetch videos on initial render', async () => {
    const mockVideos: Video[] = [createMockVideo(1), createMockVideo(2)];
    (getVideos as jest.Mock).mockResolvedValueOnce(mockVideos);

    const { result, rerender } = renderHook(() => useVideos());

    expect(result.current.loading).toBe(true);
    expect(result.current.videos).toEqual([]);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    rerender();

    expect(result.current.loading).toBe(false);
    expect(result.current.videos).toEqual(mockVideos);
    expect(getVideos).toHaveBeenCalledWith(DEFAULT_SKIP, DEFAULT_TAKE);
  });
});
