import {Component} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {Product, ProductsService} from "../../services/products.service";
import {CartService} from "../../services/cart.service";


@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    NgOptimizedImage, CommonModule, FormsModule, RouterLink
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  products: Product[]
  quantity: number = 1;

  constructor(private httpService: HttpService, private router: Router, private productService: ProductsService, private cartService: CartService) {
    this.products = []
  }

  ngOnInit() {
    this.httpService.getProducts().subscribe(data => {
      console.log(data, 'products')
      this.products = data
      this.products.forEach((product) => {
        product.quantity = 1;
      })
      this.productService.updateProducts(this.products)
    })


  }

  addToCart(product: Product) {
    const productToAdd = this.products.find((p) => p.id === product.id);
    if (productToAdd) {
      const productWithQuantity = {
        ...productToAdd,
        quantity: productToAdd.quantity
      };
      this.cartService.addToCart(productWithQuantity)
    }
  }
}
