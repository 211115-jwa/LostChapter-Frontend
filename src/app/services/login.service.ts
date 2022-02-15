import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private host = environment.hostURL;

  constructor(private http: HttpClient, private authentication: AuthenticationService) {
    this.loggedInUser = null;

  }

  loggedInUser: User| undefined | null;
  regHeaders = { 'Content-type': 'application/json' };

  checkLoginStatus() {
    let token = localStorage.getItem('Token');
    // return this.http.get(`http://localhost:8081/users/${token}/auth`,{
      return this.http.get(`${this.host}/users/${token}/auth`,{
      //'http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/loginstatus', {
      observe: 'response',
      withCredentials: true,
    });
  }

<<<<<<< HEAD
  logIn(username: string, password: string){
    return this.http.post(`http://localhost:8081/login`,{
      //'http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/login', {
      "username": username,
      "password": password
    }, {
      withCredentials: true,
      observe: 'response'
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
      headers: this.regHeaders,
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

 
=======
  public login(credentials: any): Observable<HttpResponse<User> | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/users/auth`, credentials, {observe: 'response'});
>>>>>>> af0107b2422567242419aaf17c816bb9143e6747
  }

  // async login(username: string, password: string){
  //   let credentials = {
  //     username: username,
  //     password: password,
  //   };


  //   // let resp = await fetch(`http://localhost:8081/users/auth`, {
  //     let resp = await fetch(`${this.host}/users/auth`, {
  //     method: 'POST',
  //     body: JSON.stringify(credentials),
  //     headers: this.regHeaders,
  //   });
  //   if (resp.status === 200) {
  //     let user= await resp.json();

  //     let token = resp.headers.get('Jwt-Token');
  //     console.log('RESPONSE: ' );
  //     console.log(resp);


  //     this.authentication.addUserToLocalCache(user);
  //     // localStorage.setItem('User',JSON.stringify(user));
  //     this.loggedInUser = user;

  //     console.log(this.loggedInUser);
  //     console.log(resp.headers);

  //     // this.checkLoginStatus();
  //     // window.location.href = '#';
  //     document.getElementById('error-message')!.style.display = 'none';
  //   } else {
  //     console.log("Did not work")
  //     document.getElementById('error-message')!.style.display = 'block';
  //   }
  // }

  logout() {
    // return this.http.post(`http://localhost:8081/logout`,
    return this.http.post(`${this.host}/logout`,
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
    email: string,
    birthday: string,
    role: string
  ) {
    // return this.http.put(`http://localhost:8081/user`,
    return this.http.put(`${this.host}/user`,
     // `http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/user`,
      {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
        birthday: birthday,
        role: role,
      },
      {
        withCredentials: true,
        observe: 'response',
      }
    );
  }
}

