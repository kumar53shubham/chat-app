import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-dashboard',
  templateUrl: './chat-dashboard.component.html',
  styleUrl: './chat-dashboard.component.scss',
})
export class ChatDashboardComponent {
  constructor(
    private fireAuth: AngularFireAuth,
    private fireDb: AngularFireDatabase,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  logoutFromChatDashboard() {
    this.authService.signoutFromFirebase();
    this.router.navigate(['/login']);
  }
}
