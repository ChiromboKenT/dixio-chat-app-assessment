import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChatService, IMessage, IUSer } from 'src/services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  prevMessage?: IMessage['messageID'];
  newMessage!: Observable<string>;
  messages: IMessage[] = [];
  user: IUSer | null;
  constructor(private chatService: ChatService) {
    this.user = { name: chatService.getUsername() };
  }

  date() {
    let date = new Date();

    return date.toLocaleTimeString('en-us', {
      hour12: true,
      minute: '2-digit',
      hour: '2-digit',
    });
  }
  ngOnInit() {
    //TODO: refactor unsubscribe
    return this.chatService.getNewMessage().subscribe((message: IMessage) => {
      message.mine = message.senderId === this.user?.name;
      if (this.prevMessage !== message.messageID) {
        this.messages.push(message);
      }
      this.prevMessage = message.messageID;
    });
  }
  onSubmit() {
    const { chat_input } = this.form.value;
    const message: IMessage = {
      messageID: Date.now(),
      senderId: this.user?.name!,
      messageContent: chat_input,
    };
    if (!chat_input) return;
    this.chatService.sendMessage(message);
    this.form.reset();
  }
}
