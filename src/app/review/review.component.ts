<<<<<<< HEAD
import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
=======
import { Component, OnInit } from '@angular/core';
import { Review } from '../models/review';
import { ReviewService } from '../services/review.service';

>>>>>>> 61ed51f5cc58f0f23760a9562c52e969def4be1a

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  

<<<<<<< HEAD
  constructor(private loginService: LoginService,) { }

  reviewId!: String;
  Book!: String;
  @Input() User!: String;
  reviewTitle!: String;
  reviewContent!: String;
=======
  review:Review = {
    reviewId: 0,
    reviewTitle: "title for your review",
    reviewText: "tell us about the movie your reviewing",
    ratingOne: 0,
    sentAt: "",
    user:1,
    book:0
  }

  constructor(private revServ:ReviewService) { }
>>>>>>> 61ed51f5cc58f0f23760a9562c52e969def4be1a

  ngOnInit(): void {
  }


async sendRev() {
  //this.userid = this.userServ.loggedInUser.id;
 // this.review.user = this.userid;
  this.review.book = this.revServ.bookId;
 console.log(this.review);
 
  await this.revServ.sendReview(this.review).subscribe(
    (resp: Review) => {
      this.review = resp;
     // console.log(this.review);
    });
     
   // alert("Review Submitted!");

}


}
