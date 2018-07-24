import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Router, RouterModule, Params, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private loggedIn: boolean = false;
  private keyword: string = "";
  private bookList: Book[] = [];

  constructor( private loginService: LoginService, private bookService: BookService, private router:Router) { }

  ngOnInit() {
  	this.loginService.checkSession().subscribe(
  		res => {
  			this.loggedIn = true;
  		}, error => {
  			this.loggedIn = false;
  		}
  	);
  }

  logout() {
  	this.loginService.logout().subscribe(
  		res => {
  			location.reload();
  		}, error => {
  			console.log(error);
  		}
  	);
  }

  onSearchByTitle() {
    this.bookService.searchBook(this.keyword).subscribe(
      res=> {
        this.bookList = res.json();
        console.log(this.bookList);
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "bookList" : JSON.stringify(this.bookList)
          }
        };

        this.router.navigate(['/bookList'], navigationExtras);
      },
      error=>{
        console.log(error);
      }
      );
  }

}
