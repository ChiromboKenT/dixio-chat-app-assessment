import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService, IUSer } from 'src/services/chat/chat.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  error?: string;
  @ViewChild('form') form!: NgForm;

  constructor(private chatService: ChatService, private router: Router) {}

  ngOnInit() {
    this.chatService.getRegistered().subscribe((user: IUSer) => {
      this.router.navigate(['/chat']);
    });

    this.chatService.getRegisteredError().subscribe((error: string) => {
      this.error = error;
    });
  }

  onRegister() {
    const { username } = this.form.value;
    if (!username) return;
    this.chatService.registerNewUser(username);
    this.form.reset();
  }
}
