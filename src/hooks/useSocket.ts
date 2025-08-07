import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user && !socketRef.current) {
      socketRef.current = io(import.meta.env.VITE_API_URL || 'http://localhost:3001');
      
      socketRef.current.on('connect', () => {
        console.log('Connected to server');
        socketRef.current?.emit('join_room', user.id);
      });

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      socketRef.current.on('game_result', (data) => {
        // Handle real-time game results
        console.log('Game result received:', data);
        // You can dispatch events or update state here
      });

      socketRef.current.on('notification', (notification) => {
        // Handle real-time notifications
        console.log('Notification received:', notification);
        // You can show toast notifications here
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user]);

  const emit = (event: string, data: any) => {
    socketRef.current?.emit(event, data);
  };

  const on = (event: string, callback: (data: any) => void) => {
    socketRef.current?.on(event, callback);
  };

  const off = (event: string, callback?: (data: any) => void) => {
    socketRef.current?.off(event, callback);
  };

  return { emit, on, off };
};