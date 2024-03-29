import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/user';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  userList: User[] = [];
  @Output() startChatEmitter: EventEmitter<string> = new EventEmitter();
  constructor(private fireDb: AngularFireDatabase) {
    const list: AngularFireList<User> = this.fireDb.list('users');
    list.valueChanges().subscribe((listOfUser) => {
      this.userList = listOfUser;
    });
  }

  startChatChild(uid: string) {
    this.startChatEmitter.next(uid);
  }
}
