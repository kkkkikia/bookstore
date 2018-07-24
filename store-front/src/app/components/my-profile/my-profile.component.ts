import { Component, OnInit } from '@angular/core';
import { AppConst } from '../../constants/app-const';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { UserPayment } from '../../models/user-payment';
import { UserBilling } from '../../models/user-billing';
import { UserShipping } from '../../models/user-shipping';
import { ShippingService } from '../../services/shipping.service';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  private serverPath = AppConst.serverPath;
  private dataFetched = false;
  private loginError: boolean;
  private loggedIn: boolean;
  private credential = {'username':'','password':''};

  private user: User = new User();
  private updateSuccess: boolean;
  private newPassword:string;
  private incorrectPassword: boolean;
  private currentPassword: string;

  private selectedProfileTab: number = 0;
  private selectedBillingTab: number = 0;
  private selectedShippingTab: number = 0;
  
  private userPayment: UserPayment = new UserPayment();
  private userBilling: UserBilling = new UserBilling();
  private userPaymentList: UserPayment[] = [];
  private defaultPaymentSet: boolean;
  private defaultUserPaymentId: number;
  private stateList: string[] = [];

  private userShipping: UserShipping = new UserShipping();
  private userShippingList: UserShipping[] = [];

  private defaultUserShippingId: number;
  private defaultShippingSet: boolean;

  private orderList: Order[] = [];
  private order: Order = new Order();
  private displayOrderDetail: boolean;


  constructor(
  	private loginService: LoginService,
  	private userService: UserService,
    private router: Router,
    private paymentService: PaymentService,
    private shippingService: ShippingService,
    private orderService: OrderService
  ) { }

  onUpdateUserInfo() {
  	this.userService.updateUserInfo(this.user, this.newPassword, this.currentPassword).subscribe(
  		res => {
  			console.log(res.toString());
  			this.updateSuccess = true;
  		},
  		error => {
  			console.log(error.toString());
  			let errorMessage = error.toString();
  			if(errorMessage==="Incorrect current password!") this.incorrectPassword = true;
  		}


  	);
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      res => {
        this.user = res.json();
        this.userPaymentList = this.user.userPaymentList;
        this.userShippingList = this.user.userShippingList;

        for(let index in this.userPaymentList) {
          if(this.userPaymentList[index].defaultPayment){
            this.defaultUserPaymentId=this.userPaymentList[index].id;
            break;
          }
        }

        for(let index in this.userShippingList) {
          if(this.userShippingList[index].userShippingDefault){
            this.defaultUserShippingId=this.userShippingList[index].id;
            break;
          }
        }

        this.dataFetched = true;
      }, error => {
        console.log(error);
      }
    );
  }

  onNewPayment() {
    this.paymentService.newPayment(this.userPayment).subscribe(
      res => {
        this.getCurrentUser();
        this.selectedBillingTab = 0;
        this.userPayment = new UserPayment();
      },
      error => {
        console.log(error);
      }
    );
  }

  onUpdatePayment(payment: UserPayment) {
    this.userPayment = payment;
    this.userBilling = payment.userBilling;
    this.selectedBillingTab = 1;
  }

  onRemovePayment(id: number) {
    this.paymentService.removePayment(id).subscribe(
      res => {
        this.getCurrentUser();
      },
      error => {
        console.log(error);
      }
    );
  }

  setDefaultPayment() {
    this.defaultPaymentSet = false;
    this.paymentService.setDefaultPayment(this.defaultUserPaymentId).subscribe(
      res => {
        this.getCurrentUser();
        this.defaultPaymentSet = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  selectedBillingChange(val: number) {
    this.selectedBillingTab = val;
  }

  selectedShippingChange(val: number) {
    this.selectedShippingTab = val;
  }

  onNewShipping() {
    this.shippingService.newShipping(this.userShipping).subscribe(
      res => {
        this.getCurrentUser();
        this.selectedShippingTab = 0;
        this.userShipping = new UserShipping();
      }, error => {
        console.log(error);
      }
    );
  }

  onUpdateShipping(shipping: UserShipping) {
    this.userShipping = shipping;
    this.selectedShippingTab = 1;
  }

  onRemoveShipping(id: number) {
    this.shippingService.removeShipping(id).subscribe(
      res => {
        this.getCurrentUser();
      }, error => {
        console.log(error);
      }
    );
  }

  setDefaultShipping() {
    this.defaultShippingSet = false;
    this.shippingService.setDefaultShipping(this.defaultUserShippingId).subscribe(
      res => {
        this.getCurrentUser();
        this.defaultShippingSet = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  onDisplayOrder(order: Order) {
    console.log(order);
    this.order = order;
    this.displayOrderDetail = true;
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res => {
        this.loggedIn = true;
      },
      error => {
        this.loggedIn = false;
        console.log("incactive session");
        this.router.navigate(['/myAccount']);
      }
    );

    this.getCurrentUser();

    this.orderService.getOrderList().subscribe(
      res => {
        this.orderList = res.json();
      }, error => {
        console.log(error);
      }
    );

    for (let s in AppConst.usStates) {
      this.stateList.push(s);
    }

    this.userBilling.userBillingState="";
    this.userPayment.type="";
    this.userPayment.expiryMonth="";
    this.userPayment.expiryYear="";
    this.userPayment.userBilling = this.userBilling;
    this.defaultPaymentSet = false;
    this.userShipping.userShippingState="";
    this.defaultShippingSet=false;
  }

}
