import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, windowWhen } from 'rxjs';
import { Cart } from 'src/app/models/Cart';

import { Products } from 'src/app/models/Products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  sub: Subject<Cart> = new Subject();
  items: any[] = [];
  p!: Products;

  checkCart(){

      if (window.localStorage.getItem("cart")){
        let cart =window.localStorage.getItem("cart");
        this.items = JSON.parse(cart!);
      }

  }

  addToCart(pId: number ,name : string,  quantity: number, price: number, author: string, image:string) {
    let item = {
      bookId:pId,
      bookName: name,
      quantityToBuy:quantity,
      bookPrice: price,
      author: author,
      bookImage: image,
    }
    let exist=false;


    // var cartProducts = [];
    this.items.map((cartProduct)=>{
      if(cartProduct.bookId == item.bookId){
        exist = true;
        cartProduct.quantityToBuy = quantity;
      }
    })
    if (exist == false){
      this.items.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(this.items));

    // let parameter = new HttpParams();
    // parameter = parameter.append('productId', pId);
    // parameter = parameter.append('quantity', quantity);
    // return this.http.post(`http://localhost:8081/carts/${cartId}`, 
    //  // `http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/carts/${cartId}`,//??
    //   {},
    //   {
    //     params: parameter,
    //     withCredentials: true,
    //     observe: 'response',
    //   }
    // );
   

  }

  getCartFromCustomerPage(userId: string) {
    return this.http.get<Cart>(`http://localhost:8081/users/${userId}/cart`, {
     // `http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/users/${userId}/cart`, {
        withCredentials: true
      }).subscribe((res)=> {
        this.sub.next(res);
      })
  }

  deleteProductFromCart(bookId: string, userId: string) {
    return this.http.delete(`http://localhost:8081/users/${userId}/cart`, {
    //  `http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/users/${userId}/cart`, {

      withCredentials: true,
      observe: 'response',
      params: {
        'bookId': bookId,
      },
    });
  }
}
