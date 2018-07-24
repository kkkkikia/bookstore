import { Injectable } from '@angular/core';
import { AppConst } from '../constants/app-const';
import { Http, Headers } from '@angular/http';
import { ShippingAddress } from '../models/shipping-address';
import { BillingAddress } from '../models/billing-address';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  
  private serverPath: string = AppConst.serverPath;

  constructor(private http: Http) { }

  checkout(shippingAddress: ShippingAddress, billingAddress: BillingAddress, payment: Payment, shippingMethod: string) {
  	let url = this.serverPath+'/checkout/checkout';
  	let order = {
  		"shippingAddress": shippingAddress,
  		"billingAddress" : billingAddress,
  		"payment" : payment,
  		"shippingMethod": shippingMethod
  	};
  	let tokenHeader = new Headers({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem('xAuthToken')
  	});

  	return this.http.post(url, order, {headers: tokenHeader});
  }

  getUserOrder() {
  	let url = this.serverPath+'/checkout/getUserOrder';
  	let tokenHeader = new Headers({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem('xAuthToken')
  	});

  	return this.http.get(url, {headers: tokenHeader});
  }
}
