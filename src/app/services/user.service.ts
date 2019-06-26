import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {fakeBackendProvider} from '../helpers/fake-backend';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  register(user: User) {
    return this.http.post(fakeBackendProvider.baseurl + 'register', user);
  }
}
