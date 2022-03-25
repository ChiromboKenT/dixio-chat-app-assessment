import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

export interface IMessage {
  messageID: number;
  senderId: string;
  messageContent: string;
  mine?: boolean;
}

export interface IUSer {
  id?: number;
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  user: IUSer | null = null;
  constructor(private socket: Socket) {}

  sendMessage(message: IMessage): void {
    this.socket.emit('sendMessageToServer', message);
  }

  getNewMessage(): Observable<IMessage> {
    return this.socket.fromEvent<IMessage>('messageToAllClients');
  }
  getRegistered(): Observable<IUSer> {
    return this.socket.fromEvent<IUSer>('userRegistered');
  }

  getRegisteredError(): Observable<string> {
    return this.socket.fromEvent<string>('registerError');
  }

  getUsername(): string {
    return this.user!.name;
  }

  registerNewUser(name: string): void {
    this.user = {
      name,
    };
    this.socket.emit('registerUser', this.user);
  }
}
