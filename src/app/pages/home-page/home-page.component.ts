import { Component } from '@angular/core';
import {ProductsListComponent} from "../../components/products-list/products-list.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ProductsListComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor() {

  }

}
