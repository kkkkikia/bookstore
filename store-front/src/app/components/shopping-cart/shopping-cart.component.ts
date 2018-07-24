import { Component, OnInit } from '@angular/core';
import { AppConst } from '../../constants/app-const';
import { Router, RouterModule } from '@angular/router';
import { Book } from '../../models/book';
import { CartService } from '../../services/cart.service';
import { ShoppingCart } from '../../models/shopping-cart';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  
  private serverPath: string = AppConst.serverPath;
  private selectedBook: Book;
  private cartItemList: CartItem[] = [];
  private cartItemNumber: number;
  private shoppingCart: ShoppingCart = new ShoppingCart();
  private cartItemUpdated: boolean;
  private emptyCart: boolean;
  private notEnoughStock: boolean;

  constructor(
  	private router: Router,
  	private cartService: CartService
  ) { }
  
  onSelect(book: Book) {
  	this.selectedBook = book;
  	this.router.navigate(['/bookDetail', this.selectedBook.id]);
  }

  onRemoveCartItem(cartItem: CartItem){
  	this.cartService.removeCartItem(cartItem.id).subscribe(
  		res => {
  			console.log(res.toString());
  			this.getCartItemList();
  			this.getShoppingCart();
  		}, error => {
  			console.log(error);
  		}
  	);
  }

  onUpdateCartItem(cartItem : CartItem) {
  	this.cartService.updateCartItem(cartItem.id, cartItem.qty).subscribe(
  		res => {
  			console.log(res);
  			this.cartItemUpdated = true;
  			this.getShoppingCart();
  		}, error => {
  			console.log(error);
  		}
  	);
  }

  getCartItemList() {
  	this.cartService.getCartItemList().subscribe(
  		res => {
  			this.cartItemList = res.json();
  			this.cartItemNumber = this.cartItemList.length;
  		}, error => {
  			console.log(error);
  		}
  	);
  }

  getShoppingCart() {
  	this.cartService.getShoppingCart().subscribe(
  		res => {
  			console.log(res.json());
  			this.shoppingCart = res.json();
  		}, error => {
  			console.log(error);
  		}
  	);
  }

  onCheckout() {
  	if(this.cartItemNumber == 0) {
  		this.emptyCart = true;
  	} else {
  		for (let item of this.cartItemList) {
  			if(item.qty > item.book.inStockNumber) {
  				console.log("not enough stock on some item");
  				this.notEnoughStock = true;
  				return;
  			}
  		}

  		//this.router.navigate(['/order']);
  	}
  }

  ngOnInit() {
  	this.getShoppingCart();
  	this.getCartItemList();
  }

}
