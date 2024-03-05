import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-chat-dashboard',
  templateUrl: './chat-dashboard.component.html',
  styleUrl: './chat-dashboard.component.scss',
})
export class ChatDashboardComponent {
  currentUser: User | null = new User();
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
}
