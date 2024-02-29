import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user: User = new User();
  loginData = {
    email: '',
    password: '',
  };
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}
  loginFormSubmitted(event: SubmitEvent) {
    event.preventDefault();
    console.log(this.loginData);
    // validate data
    // blank name is not allowded
    if (this.loginData.email.trim() == '') {
      this.toastr.warning('Email is required!!');
      return;
    }
    if (this.loginData.password.trim() == '') {
      this.toastr.warning('Password is required!!');
      return;
    }

    // for login: we use firebase
    this.authService
      .login(this.loginData.email, this.loginData.password)
      .then((result) => {
        // login success
        console.log(result);
        this.toastr.success('login success');
        this.authService.getUserByUserId(result.user!.uid).subscribe((data) => {
          console.log(data);
          this.authService.setUserToLocalStorage(data!);
          this.router.navigate(['/chat-dashboard']);
        });
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error(error);
        this.toastr.error('error in login');
      });
  }
}
