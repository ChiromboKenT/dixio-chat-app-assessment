import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  printConnection(status: string, id: string) {
    if (status === 'success') {
      console.log(`Client connected ${id}`);
    } else {
      console.log(`Client disconnected ${id}`);
    }
  }
}
