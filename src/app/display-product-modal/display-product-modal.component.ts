import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
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
  styleUrls: ['./display-product-modal.component.css'],
})
export class DisplayProductModalComponent implements OnInit {
  log = console.log;
  reviews!: Review[];
<<<<<<< HEAD
  constructor(private revServ: ReviewService, private cartService: CartService,
    private router: Router, private loginService: LoginService,
    private addProductToCartService: SearchProductsService, public dialog: MatDialog,
    private getGenreService: SearchProductsService, private reviewServ: ReviewService,
    public dialogRef: MatDialogRef<DisplayProductModalComponent>, @Inject(MAT_DIALOG_DATA) public data: SearchProducts) { }
  // numbers: number[];
  // this.numbers = Array(5).fill().map((x,i)=>i);

=======
  constructor(
    private revServ: ReviewService,
    private cartService: CartService,
    private router: Router,
    private loginService: LoginService,
    // private CartService: CartService,
    public dialog: MatDialog,
    private getGenreService: SearchProductsService,
    private reviewServ: ReviewService,
    public dialogRef: MatDialogRef<DisplayProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SearchProducts
  ) {}
>>>>>>> af0107b2422567242419aaf17c816bb9143e6747

  selectedProducts!: SearchProducts;
  errorMessage!: string;
  cartId!: number;
  quantity = 0;
  userId!: number;
  added?: boolean;
<<<<<<< HEAD
  addedToCart = "Item have been added to Cart";
  bookReviews!: Review[];
=======
  addedToCart = 'Item have been added to Cart';
  bookReviews!: Review[];

>>>>>>> af0107b2422567242419aaf17c816bb9143e6747
  role!: String;
  addToCart = 'Add to Cart';

<<<<<<< HEAD

=======
>>>>>>> af0107b2422567242419aaf17c816bb9143e6747
  ngOnInit() {
    this.checkLoginStatus();
    this.viewBookReviews(this.data.bookId);
    // console.log(this.reviews);
  }
    //--Buttons--//
  onCloseDisplayProduct() {
    this.dialogRef.close('Confirm');
  }
     // --Review Service--//
  viewBookReviews(bookId: number) {
    this.revServ.getAllReviewsbyBookId(bookId).subscribe((res) => {
      this.reviews = <Review[]>res.body;
<<<<<<< HEAD

    })

=======
    });
  }

  onCloseDisplayProduct() {
    this.dialogRef.close('Confirm');
>>>>>>> af0107b2422567242419aaf17c816bb9143e6747
  }

  addBookReview(bookId: number) {
    this.log(bookId);
    this.revServ.bookId = bookId;
<<<<<<< HEAD
    this.dialog.open(ReviewComponent);
  }

  //--User Service--//
checkLoginStatus() {
=======

    this.dialog.open(ReviewComponent);
  }

  checkLoginStatus() {
>>>>>>> af0107b2422567242419aaf17c816bb9143e6747
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
  //--Cart Service--//
  onAddToCart(productId: number) {
<<<<<<< HEAD
    let item = {
      productId: productId,
      quantity: this.quantity,
      name: this.selectedProducts.bookName
=======
    let quantity: any = this.quantity;
    var item: any;

    if (this.selectedProducts.saleIsActive) {
      item = {
        productId: productId,
        bookName: this.selectedProducts.bookName,
        quantity: parseInt(quantity),
        price:
          this.selectedProducts.bookPrice -
          this.selectedProducts.bookPrice *
            this.selectedProducts.saleDiscountRate,
        author: this.selectedProducts.author,
        bookImage: this.selectedProducts.bookImage,
        quantityOnHand: this.selectedProducts.quantityOnHand,
      };
    } else {
      item = {
        productId: productId,
        bookName: this.selectedProducts.bookName,
        quantity: parseInt(quantity),
        price: this.selectedProducts.bookPrice,
        author: this.selectedProducts.author,
        bookImage: this.selectedProducts.bookImage,
        quantityOnHand: this.selectedProducts.quantityOnHand,
      };
>>>>>>> af0107b2422567242419aaf17c816bb9143e6747
    }

<<<<<<< HEAD


    // this.addProductToCartService
    //   .addToCart(String(productId), String(this.quantity), String(this.cartId))
    //   .subscribe({
    //     next: (res) => {
    //       if (res.status === 200) {
    //         let body = <Cart>res.body;
    //         this.added = true;
    //       }
    //     },
    //     error: (err) => {
    //       this.errorMessage = err.error;
    //     },
    //   });
  }
=======
    console.log(this.selectedProducts);

    this.cartService.addToCart(
      item.productId,
      item.bookName,
      item.quantity,
      item.price,
      item.author,
      item.bookImage,
      item.quantityOnHand
    );
    window.location.href = '/cart';

    // localStorage.setItem('cart', JSON.stringify(item));
    // console.log(item);
  }
  // this.addProductToCartService
  //   .addToCart(String(productId), String(this.quantity), String(this.cartId))
  //   .subscribe({
  //     next: (res) => {
  //       if (res.status === 200) {
  //         let body = <Cart>res.body;
  //         this.added = true;
  //       }
  //     },
  //     error: (err) => {
  //       this.errorMessage = err.error;
  //     },
  //   });
>>>>>>> af0107b2422567242419aaf17c816bb9143e6747
}
