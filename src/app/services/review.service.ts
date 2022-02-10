import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BooksToBuy } from '../models/BooksToBuy';
import { Review } from '../models/review';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

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

  postNewReview(reviewId: string, book: BooksToBuy, user: User, reviewTitle: String, reviewContent: String) {
    return this.http.post(`http://localhost:8081/reviews` ,
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/reviews`, 
      {
      "reviewId": reviewId,
      "book": book,
      "user": user,
      "reviewTitle": reviewTitle,
      "reviewContent": reviewContent
      }, 
      {
      withCredentials: true,
      observe: 'response',
      responseType: 'text'
      }
    );
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
