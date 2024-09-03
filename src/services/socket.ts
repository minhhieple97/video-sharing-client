import { io, Socket } from 'socket.io-client';
import { VideoShareData } from '../interfaces';

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect(url: string): void {
    this.socket = io(url);
    console.log('Connected to socket server');
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public on(event: string, callback: (data: VideoShareData) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }
}

export default SocketService.getInstance();
