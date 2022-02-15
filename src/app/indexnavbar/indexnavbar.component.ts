import { User } from 'src/app/models/User';
import { LoginComponent } from '../login/login.component';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SearchProducts } from 'src/app/models/SearchProduct';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { SearchProductsService } from '../services/search-products.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-indexnavbar',
  templateUrl: './indexnavbar.component.html',
  styleUrls: ['./indexnavbar.component.css']
})
export class IndexnavbarComponent implements OnInit {
  // boolean checks to make the navbar dynamic based on login status
  loggedIn:boolean= false;
  notLoggedIn:boolean= true;
  ableToSignUp:boolean= true;
  ableToLogIn:boolean= true;
  d:Date = new Date("1993-03-01");
  role!:String;
  currentUser!: String;
  loggedInUser: User| undefined | null;
  // boolean check to properly redirect user to their profile page
  roleIsCustomer:boolean= false;
  roleIsAdmin:boolean = false;

  // checkIfLoggedIn() {
  //   this.loginService.checkLoginStatus().subscribe((res) => {
  //     if (res.status === 200 || res.status === 201){ // depending on the status
  //       let body = <User> res.body;
  //       this.role = body.role;
  //       this.ableToSignUp = !this.ableToSignUp;
  //       this.currentUser = body.username;
  //       this.ableToLogIn = !this.ableToLogIn;
  //       this.loggedIn = !this.loggedIn;
  //       this.notLoggedIn = !this.notLoggedIn;

  //       // the two if statements below control the *ngIf for the profile button
  //       if(body.role === 'Customer'){
  //         this.roleIsCustomer = true;
  //         this.roleIsAdmin = false;
  //       }
  //       if(body.role === 'Admin'){
  //         this.roleIsAdmin = true;
  //         this.roleIsCustomer = false;
  //       }
  //     }
  //   },
  //   (err) => {
  //     console.log(err);
  //   });
  // }

  private isUserLoggedIn(): boolean {
    if(this.authenticationService.isLoggedIn()) {
      localStorage.setItem('User',JSON.stringify(user));
      this.loggedInUser=JSON.stringify(localStorage.getItem('Token'));
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  logout(){
    if (this.role  === 'Customer'){
      this.loginService.logout().subscribe((res) => {
        if (res.status === 200 || res.status === 201){
          // toggling booleans
          this.loggedIn = !this.loggedIn;
          this.ableToSignUp = !this.ableToSignUp;
          this.ableToLogIn = !this.ableToLogIn;
          this.notLoggedIn = !this.notLoggedIn;
        }
      });

    }
    if (this.role  === 'Admin'){
      this.loginService.logout().subscribe((res) => {
        if (res.status === 200 || res.status === 201){
          // toggling booleans
          this.loggedIn = !this.loggedIn;
          this.ableToSignUp = !this.ableToSignUp;
          this.ableToLogIn = !this.ableToLogIn;
          this.notLoggedIn = !this.notLoggedIn;
        }
      });

    }
  }
  constructor(private loginService:LoginService, private http: HttpClient, private searchProductService: SearchProductsService, private router: Router, private authenticationService: AuthenticationService) { }

  searchProduct!: SearchProducts;

  isSearchBlank!: true;

  ngOnInit(): void {
    this.isUserLoggedIn();

    // get current signed in user, so it will be used to toggle loggedInTrue and show the user's username
  }

  searchItem = '';

  searchKeyword!: string;
  @Output('searchKeyword') searchKeywordEmitter = new EventEmitter<string>()

  // for page pagination
  // p: number = 1;
  // collection: any[] = someArrayOfThings;

  displaySearchResults() {
    if (this.searchItem === ''){
      this.router.navigate([''])
    }
    // searchKeyword Emmitter
    this.searchKeywordEmitter.emit(this.searchItem);

  }
}
function user(user: any): string {
  throw new Error('Function not implemented.');
}

