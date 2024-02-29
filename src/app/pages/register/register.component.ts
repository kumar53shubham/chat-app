import { Component } from '@angular/core';
import { User } from '../../models/user';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  user: User = new User();

  constructor(
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  registerFormSubmitted(event: SubmitEvent) {
    event.preventDefault();
    console.log(this.user);
    // validate data
    // blank name is not allowded
    if (this.user.name.trim() == '') {
      this.toastr.warning('Name is required!!');
      return;
    }
    if (this.user.email.trim() == '') {
      this.toastr.warning('Email is required!!');
      return;
    }
    if (this.user.password.trim() == '') {
      this.toastr.warning('Password is required!!');
      return;
    }
    // if (this.user.about.trim() == '') {
    //   this.toastr.warning('About is required!!');
    //   return;
    // }

    // form submit
    // register code goes here
    this.authService.register(this.user);
    this.user=new User();
  }

}
