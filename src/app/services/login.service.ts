import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {
    this.loggedInUser = null;

  }

  loggedInUser: any| undefined | null;

  checkLoginStatus() {
    let token = localStorage.getItem('Token');
    return this.http.get(`http://localhost:8081/users/${token}/auth`,{
      //'http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/loginstatus', {
      observe: 'response',
      withCredentials: true,
    });
  }

  async login(username: string, password: string){
    let credentials = {
      username: username,
      password: password,
    };
    
    let resp = await fetch(`http://localhost:8081/users/auth`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-type': 'application/json' },
    });
    if (resp.status === 200) {
      let token = await resp.json();
      localStorage.setItem('Token', token);
      console.log(token)
      // this.checkLoginStatus();
      // window.location.href = '#';
      document.getElementById('error-message')!.style.display = 'none';
    } else {
      console.log("Did not work")
      document.getElementById('error-message')!.style.display = 'block';
    }

 
  }

  logout() {
    return this.http.post(`http://localhost:8081/logout`,
      //'http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/logout',
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
    return this.http.put(`http://localhost:8081/user`,
     // `http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/user`,
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
      }
    );
  }
}
