import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchProductsService {

  constructor(private http: HttpClient) { }

  getAllGenre(){
    return this.http.get(`http://localhost:8081/book/genre`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/search/${searchItem}`, {
      observe: 'response'
    })

  }

  getAllBooks(){
    return this.http.get(`http://localhost:8081/book`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/search/${searchItem}`, {
      observe: 'response'
    })
  }

  getSearchResult(searchItem: string){
    return this.http.get(`http://localhost:8081/book/search/${searchItem}`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/search/${searchItem}`, {
        observe: 'response'
    })
  }

  getSearchByGenre(genre: string){
    return this.http.get(`http://localhost:8081/book/genre/${genre}`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/genre/${genreId}`, {
      observe: 'response'
    })
  }

  getBookBySales(){
    return this.http.get(`http://localhost:8081/book/books/sales`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/sales`, {
      observe: 'response'
    })
  }

  addToCart(productId: string, quantity: string, userId: string){
    let parameter = new HttpParams();
    parameter = parameter.append('bookId', productId);
    parameter = parameter.append('quantityToBuy', quantity);
    return this.http.post(`http://localhost:8081/users/{userId}/cart`, {},
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/users/${userId}/cart`, {},
      {
        "params": parameter,
        withCredentials: true,
        observe:'response'
      })
  }

  getBookById(bookId: number){
    return this.http.get(`http://localhost:8081/book/${bookId}`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/${bookId}`, {
      observe: 'response'
    })
  }

  getFeaturedBooks(){
    return this.http.get(`http://localhost:8081/book/featured`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/featured`, {
      observe: 'response'
    })
  }



}


