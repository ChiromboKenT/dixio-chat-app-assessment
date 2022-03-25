import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import internal from 'stream';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: ['http://localhost:4200'] } })
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
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('messageToAllClients', payload);
  }

  @SubscribeMessage('registerUser')
  handleRegisterUser(client: Socket, payload: { name: string }) {
    const user = {
      id: client.id,
      name: payload.name,
    };

    console.log(user);
  }
}
