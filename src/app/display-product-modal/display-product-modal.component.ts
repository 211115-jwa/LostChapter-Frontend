import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SearchProducts } from 'src/app/models/SearchProduct';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/models/User';
import { Cart } from 'src/app/models/Cart';
import { LoginService } from '../services/login.service';
import { SearchProductsService } from '../services/search-products.service';
import { ReviewService } from '../services/review.service';
import { Review } from '../models/review';
import { ReviewComponent } from '../review/review.component';


@Component({
  selector: 'app-display-product-modal',
  templateUrl: './display-product-modal.component.html',
  styleUrls: ['./display-product-modal.component.css']
})
export class DisplayProductModalComponent implements OnInit {
 log = console.log;
  constructor(private revServ:ReviewService,private cartService: CartService, private router: Router, private loginService: LoginService, private addProductToCartService: SearchProductsService, public dialog: MatDialog, private getGenreService: SearchProductsService, private reviewServ: ReviewService, public dialogRef: MatDialogRef<DisplayProductModalComponent>, @Inject(MAT_DIALOG_DATA)public data: string) { }

  selectedProducts!: SearchProducts;
  errorMessage!: string;
  cartId!: number;
  quantity = 1;
  userId!: number;
  added?: boolean;
  addedToCart = "Item have been added to Cart";
  bookReviews!: Review[];
  

  role!: String;

  addToCart = "Add to Cart";

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  onCloseDisplayProduct() {
    this.dialogRef.close('Confirm');
  }

  
  viewBookReviews(bookId:number) {
    this.log(bookId);
this.revServ.bookId = bookId;
  
this.dialog.open(ReviewComponent);
  //   });
  }

  checkLoginStatus(){
    this.loginService.checkLoginStatus().subscribe({
      next: (res) => {
        if (res.status === 200) {
          let body = <User>res.body;
          this.role = body.role;
          console.log(this.role);
          if (body.role === 'Customer') {
            this.cartId = body.id;
            this.cartService.getCartFromCustomerPage(String(this.cartId));
          }
        }
      },
      error: (err) => {
        if (err.status === 400) {
          this.router.navigate(['']);
        }
      },
    });
  }

  onAddToCart(productId: number){
    this.addProductToCartService.addToCart(String(productId), String(this.quantity), String(this.cartId)).subscribe({
      next: (res) => {
        if(res.status === 200) {
          let body = <Cart> res.body;
          this.added = true;
        }
      },
      error: (err) => {
        this.errorMessage = err.error;

      }
    })
  }


}
