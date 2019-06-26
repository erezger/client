import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {User} from '../models/user';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
  currentUser: User;
  users = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
  }
}
