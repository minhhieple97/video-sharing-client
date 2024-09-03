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
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: false,
    });

    socketRef.current = socket;
    const onConnect = () => {
      setIsConnected(true);
    };
    const onDisconnect = () => {
      setIsConnected(false);
    };
    const onConnectError = (error: unknown) => {
      console.log(`Connect error: ${error}`);
    };
    const onReconnectAttempt = (attemptNumber: number) => {
      console.log(`Reconnecting: ${attemptNumber}`);
    };
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);
    socket.on('reconnect_attempt', onReconnectAttempt);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
      socket.off('reconnect_attempt', onReconnectAttempt);
    };
  }, []);
  useEffect(() => {
    const connect = () => {
      if (socketRef.current && !isConnected) {
        socketRef.current.connect();
      }
    };
    const disconnect = () => {
      if (socketRef.current && isConnected) {
        socketRef.current.disconnect();
      }
    };
    if (user) {
      connect();
      return;
    }
    disconnect();
  }, [isConnected, user]);

  return {
    socket: socketRef.current,
    isConnected,
  };
};
