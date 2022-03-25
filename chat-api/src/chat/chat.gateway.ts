import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import internal from 'stream';
import { ChatService, IMessage } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:4200',
      'http://localhost:3000',
      'http://localhost:80',
      'http://localhost:8080',
    ],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) {}
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    this.chatService.printConnection('success', client.id);
  }
  handleDisconnect(client: Socket) {
    this.chatService.printConnection('disconnected', client.id);
  }

  @SubscribeMessage('sendMessageToServer')
  handleMessage(client: Socket, payload: IMessage): void {
    this.server.emit('messageToAllClients', payload);
  }

  @SubscribeMessage('registerUser')
  handleRegisterUser(client: Socket, payload: { name: string }) {
    const user = {
      id: 22,
      name: payload.name,
    };

    if (this.chatService.isRegistered(user.name)) {
      client.emit('registerError', 'user is already registered');
    } else {
      this.chatService.registerUser(user);
      client.emit('userRegistered', user);
    }
  }
}
