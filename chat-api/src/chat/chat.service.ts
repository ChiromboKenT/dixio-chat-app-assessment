import { Injectable } from '@nestjs/common';

export interface IMessage {
  messageID: number;
  senderId: string;
  messageContent: string;
  mine?: boolean;
}

export interface IUser {
  id?: number;
  name: string;
}

@Injectable()
export class ChatService {
  users: IUser[] = [];
  messages: IMessage[] = [];
  printConnection(status: string, id: string) {
    if (status === 'success') {
      console.log(`Client connected ${id}`);
    } else {
      console.log(`Client disconnected ${id}`);
    }
  }

  registerUser(user: IUser) {
    this.users.push(user);
  }

  getUsers() {
    this.users;
  }

  isRegistered(username: string) {
    const findIndex = this.users.findIndex((user) => user.name === username);
    console.log(findIndex);
    return findIndex >= 0;
  }

  newMessage(message: IMessage) {
    this.messages.push(message);
  }

  getMessages() {
    return this.messages;
  }
}
