import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksToBuy } from '../models/BooksToBuy';
import { Products } from '../models/Products';
import { Review } from '../models/review';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
review!:Review;
//book!:Products;
  //book!:Products;
  public bookId!: number;

  constructor(private http: HttpClient) { }

  getAllReviews() {
    return this.http.get(`http://localhost:8081/reviews`, {
    // `http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/reviews`, {
      observe: 'response'
  })
  }

  getReviewById(reviewId: String) {
    return this.http.get(`http://localhost:8081/reviews/${reviewId}`, {
    //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/reviews/${reviewId}` , {
      observe: 'response'
    })
  }
  sendReview(review:Review){
    console.log(review);
    this.http.post(`http://localhost:8081/reviews/`, review);
  }


  updateReviewById(reviewId: String, updatedReview: Review) {
    return this.http.put(`http://localhost:8081/reviews/${reviewId}`,
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/reviews/${reviewId}`, 
      {
      "updatedReview": updatedReview
      }, 
      {
      withCredentials: true,
      observe: 'response',
      }
    );
  }

  getAllReviewsForBook(bookId: number) {
    return this.http.put(`http://localhost:8081/reviews//book/${bookId}`,
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/reviews/book/${bookId}`,
      {
      observe: 'response'
      }
    );
  }

}
