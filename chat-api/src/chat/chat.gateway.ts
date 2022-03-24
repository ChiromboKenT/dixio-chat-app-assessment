import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: ['*'] } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log('connection made');
  }
  handleDisconnect(client: Socket) {
    console.log(`disconnected ${client.id}`);
  }

  @SubscribeMessage('sendMessageToServer')
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('messageToAllClients', payload);
  }
}
