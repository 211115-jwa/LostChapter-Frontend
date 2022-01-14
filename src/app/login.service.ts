import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  checkLoginStatus() {
    return this.http.get('http://localhost:8081/loginstatus', {
      observe: 'response',
      withCredentials: true,
    });
  }

  login(username: string, password: string) {
    return this.http.post(
      'http://localhost:8081/login',
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true,
        observe: 'response',
      }
    );
  }

  logout() {
    return this.http.post(
      'http://localhost:8081/logout',
      {},
      {
        observe: 'response',
        withCredentials: true,
        responseType: 'text',
      }
    );
  }
  updateUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    birthday: string,
    address: string,
    role: string
  ) {
    return this.http.put(
      `http://localhost:8081/update`,
      {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        age: age,
        email: email,
        birthday: birthday,
        address: address,
        role: role,
      },
      {
        withCredentials: true,
        observe: 'response',
        responseType: 'text',
      }
    );
  }
}
