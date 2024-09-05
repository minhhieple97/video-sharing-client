import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

const env = import.meta.env;
const SOCKET_URL = env.VITE_SOCKET_URL;

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    let socket: Socket | null = null;

    const setupSocket = () => {
      if (user?.token) {
        socket = io(SOCKET_URL, {
          transports: ['websocket', 'polling'],
          autoConnect: false,
          auth: {
            token: `Bearer ${user.token}`,
          },
        });

        socket.on('connect', () => {
          setIsConnected(true);
        });

        socket.on('disconnect', () => {
          setIsConnected(false);
        });

        socket.on('connect_error', (error: unknown) => {
          console.log(`Connect error: ${error}`);
        });

        socket.on('reconnect_attempt', (attemptNumber: number) => {
          console.log(`Reconnecting: ${attemptNumber}`);
        });

        socket.connect();
        socketRef.current = socket;
      }
    };

    const cleanupSocket = () => {
      if (socket) {
        socket.disconnect();
        socket.off('connect');
        socket.off('disconnect');
        socket.off('connect_error');
        socket.off('reconnect_attempt');
        socketRef.current = null;
        setIsConnected(false);
      }
    };

    setupSocket();

    return () => {
      cleanupSocket();
    };
  }, [user?.token]);

  return {
    socket: socketRef.current,
    isConnected,
  };
};
