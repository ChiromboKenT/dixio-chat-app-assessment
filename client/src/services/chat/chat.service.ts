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
    console.log('emit message');
    console.log(JSON.stringify(message));
    //this.socket.emit('sendMessageToServer', message);
  }

  getNewMessage(): Observable<IMessage> {
    return this.socket.fromEvent<IMessage>('newMessage');
  }

  getUsername(): string {
    return this.user!.name;
  }

  registerNewUser(name: string): void {
    this.user = {
      name,
    };
    console.log(this.user);
    //this.socket.emit('registerUser', this.user);
  }
}
