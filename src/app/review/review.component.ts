import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  

  constructor(private loginService: LoginService,) { }

  reviewId!: String;
  Book!: String;
  @Input() User!: String;
  reviewTitle!: String;
  reviewContent!: String;

  ngOnInit(): void {
  }

}
