import { renderHook, act } from '@testing-library/react';
import io from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';
import { useSocket } from '../hooks/useSocket';

jest.mock('../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('socket.io-client');

describe('useSocket', () => {
  const mockSocket = {
    on: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
    off: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (io as jest.Mock).mockReturnValue(mockSocket);
    (useAuth as jest.Mock).mockReturnValue({ user: { token: 'test-token' } });
  });

  it('should not initialize socket when user has no token', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    const { result } = renderHook(() => useSocket());

    expect(io).not.toHaveBeenCalled();
    expect(result.current.isConnected).toBe(false);
    expect(result.current.socket).toBe(null);
  });

  it('should update isConnected on connect and disconnect events', () => {
    const { result } = renderHook(() => useSocket());

    act(() => {
      const connectHandler = mockSocket.on.mock.calls.find((call) => call[0] === 'connect')[1];
      connectHandler();
    });
    expect(result.current.isConnected).toBe(true);

    act(() => {
      const disconnectHandler = mockSocket.on.mock.calls.find(
        (call) => call[0] === 'disconnect',
      )[1];
      disconnectHandler();
    });
    expect(result.current.isConnected).toBe(false);
  });

  it('should clean up socket on unmount', () => {
    const { unmount } = renderHook(() => useSocket());

    unmount();

    expect(mockSocket.disconnect).toHaveBeenCalled();
    expect(mockSocket.off).toHaveBeenCalledTimes(4);
  });
});
