import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Message } from '../../models/message';

@Component({
  selector: 'app-chat-dashboard',
  templateUrl: './chat-dashboard.component.html',
  styleUrl: './chat-dashboard.component.scss',
})
export class ChatDashboardComponent {
  currentUser: User | null = new User();
  toUser!: User | null;
  message: string = '';
  chatRefNode: string = '';
  oppChatRefNode: string = '';
  constructor(
    private fireAuth: AngularFireAuth,
    private fireDb: AngularFireDatabase,
    public authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    // get current logged in user from fire database
    this.fireAuth.authState.subscribe((user) => {
      console.log(user);
      this.authService.getUserByUserId(user!.uid).subscribe((user) => {
        this.currentUser = user;
      });
    });
  }

  logoutFromChatDashboard() {
    this.authService.signoutFromFirebase();
    this.router.navigate(['/login']);
  }

  startChatParent(uid: string) {
    console.log('parent ' + uid);

    this.chatRefNode = `chats/${this.currentUser?.uid}****${uid}`; //chat from - to
    this.oppChatRefNode = `chats/${uid}****${this.currentUser?.uid}`; //chat to - from

    this.authService.getUserByUserId(uid).subscribe({
      next: (user) => {
        this.toUser = user;
        console.log(this.toUser);
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Eroor in starting chat!!');
      },
    });
  }

  sendMessage(event: SubmitEvent) {
    event.preventDefault();
    if (this.message.trim() === '') {
      return;
    }
    // send the message
    console.log(this.message);
    const msg = new Message();
    msg.message = this.message;
    msg.from = this.currentUser!.uid;
    msg.to = this.toUser!.uid;

    const chatRef: AngularFireObject<Message> = this.fireDb.object(
      `${this.chatRefNode}/${new Date()}`
    );
    chatRef
      .set(msg)
      .then((data) => {
        this.toastr.success('message send success!!');
        this.message = '';
      })
      .catch((error) => {
        this.toastr.error('error in sending message!!');
        console.log(error);
      });
  }
}
