import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { SearchProducts } from 'src/app/models/SearchProduct';
import { DisplayProductModalComponent } from '../display-product-modal/display-product-modal.component';
import { Genre } from '../models/genre';
import { LoginService } from '../services/login.service';
import { SearchProductsService } from '../services/search-products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService, private getGenreService: SearchProductsService,
    private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllGenre();
    this.getByGenre("unknown");
  }

  displayProducts: SearchProducts[] = [];
  selectedIndex: string = "unknown";
  selectedProducts!: SearchProducts;
  genre: Genre[]=[];



  // bookId!: number;
  dialogResult!: string;


  getSelectedIndex(): string {
    return this.selectedIndex;
  }

  onTabChange(event: MatTabChangeEvent){
    this.getByGenre(this.selectedIndex);
  }

  getAllGenre() {
    this.getGenreService.getAllGenre().subscribe((res) => {
      let body = <Genre[]> res.body;
      this.genre = body
    })
  }
  getByGenre(genre: string) {
    this.getGenreService.getSearchByGenre(genre).subscribe((res) => {
      let body = <SearchProducts[]> res.body;
      this.displayProducts = body
    })
  }

  onDisplayProduct(bookId: number){
    let modalRef = this.dialog.open(DisplayProductModalComponent, {
      width: '1400px',
      height: '700px',
      data: 'Book Information'
    });

      this.getGenreService.getBookById(bookId).subscribe((res) => {
          let responseObj = <SearchProducts>res.body;
          this.selectedProducts = responseObj

          let instance = modalRef.componentInstance;
          instance.selectedProducts = this.selectedProducts;

      });

    modalRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
    });

  }

  showResults: SearchProducts[] = [];
  setShowResults(showResults: SearchProducts[]) {
    this.showResults = showResults;
  }

  showKeyword!: string;
  setShowKeyowrd(showKeyword: string){
    this.showKeyword = showKeyword;
    this.showSearchResults();
  }

  showSearchResults(){
    this.getGenreService.getSearchResult(this.showKeyword).subscribe((res) => {
      let body = <SearchProducts[]> res.body;
      this.showResults = body;
  })
  }

}


