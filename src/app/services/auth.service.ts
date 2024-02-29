import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private fireDb: AngularFireDatabase,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // for registration of user
  register(user: User) {
    this.fireAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.toastr.success('saving user data', 'Register success');
        console.log(result);
        // user.uid = result.user!.uid ;
        user.uid = result.user?.uid || '';
        user.displayName = result.user?.displayName || user.name.toUpperCase();
        user.emailVerified = result.user!.emailVerified;
        user.password = '';
        user.imageUrl =
          result.user?.photoURL || 'https://picsum.photos/200/300';
        // save user data also after creating user
        this.saveUserData(user)
          .then((data) => {
            console.log(data);
            this.toastr.success('user data saved!!');
            this.setUserToLocalStorage(user);
          })
          .catch((error) => {
            console.log(error);
            this.toastr.error('error in saving data');
          });
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('error in signup!!');
      });
  }

  // save user detail in real time database like firebase
  saveUserData(user: User) {
    const userObjectRef: AngularFireObject<User> = this.fireDb.object(
      `users/${user.uid}`
    );
    return userObjectRef.set(user);
  }

  // save user data to local storage
  setUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // return status of login and if user logged in then return user
  get loggedInStatus() {
    const userString = localStorage.getItem('user');
    if (userString == null) {
      return false;
    } else {
      return JSON.parse(userString);
    }
  }

  // remove the user from local storage
  logoutFromLocalStorage() {
    localStorage.removeItem('user');
  }

  // logout the user from firebase database and also remove from local storage
  signoutFromFirebase() {
    this.fireAuth
      .signOut()
      .then(() => {
        this.logoutFromLocalStorage();
        this.toastr.success('Logout success!!');
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('error in logging out!!');
      });
  }

  // for login the user
  login(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  getUserByUserId(uid: string) {
    const userObjectRef: AngularFireObject<User> = this.fireDb.object(
      `users/${uid}`
    );
    return userObjectRef.valueChanges();
  }
}
