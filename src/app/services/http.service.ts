import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {Product} from "./products.service";
import {Cart} from '../services/cart.service'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<[]> {
    return this.http.get<[]>('https://fakestoreapi.com/products')
  }

  getProduct(id:number): Observable<Product> {
    return this.http.get<Product>('https://fakestoreapi.com/products/' + id)
  }

  addToCart({userId, products}: {
    userId: number,
    products: [{
      productId: number,
      quantity: number
    }]
  }) {
    return this.http.post('https://fakestoreapi.com/carts', {
      userId, products
    })
  }

  getCart(): Observable<Cart> {
    return this.http.get<Cart[]>('https://fakestoreapi.com/carts/user/1').pipe(
      map(res => res[0]) // Assuming the response is an array and we need the first item
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`https://fakestoreapi.com/products/${id}`);
  }
}
