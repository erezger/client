import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({providedIn: 'root'})
export class HttpInterceptor {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService) {
  }

  createAuthorizationHeader(headers: HttpHeaders) {
    const currentUser = this.authenticationService.currentUserValue;
    headers.set('Authorization', currentUser.accessToken);
  }

  get(url) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers
    });
  }

  post(url, data) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers
    });
  }

  put(url, data) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.put(url, data, {
      headers
    });
  }

  delete(url) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers
    });
  }
}
