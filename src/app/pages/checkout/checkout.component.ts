import {Component} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {CommonModule} from "@angular/common";
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CartService,Cart} from "../../services/cart.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cart: Cart
  cartSubscription: Subscription | undefined

  checkoutData = new FormGroup({
    cardNumber: new FormControl('', Validators.required),
    expiryDate: new FormControl('', Validators.required),
    cvv: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required),
  })

  constructor(private http: HttpService, private _router: Router,private cartService: CartService) {
    this.cart = {}
  }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe(cart => {
      this.cart = cart;
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  submitCheckout() {
    console.log(this.checkoutData.status, 'status');
    console.log(this.checkoutData.value);
    this.cart = {
      ...this.cart,
      checkout: {
        cardNumber: this.checkoutData.value.cardNumber!,
        expiryDate: this.checkoutData.value.expiryDate!,
        cvv: this.checkoutData.value.cvv!,
        email: this.checkoutData.value.email!,
        address: this.checkoutData.value.address!,
        city: this.checkoutData.value.city!,
        region: this.checkoutData.value.region!,
        postalCode: this.checkoutData.value.postalCode!,
      }
    }
    this.cartService.updateCart(this.cart)
    this._router.navigateByUrl('/confirm')


  }
}
