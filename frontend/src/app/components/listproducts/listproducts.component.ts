import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listproducts',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './listproducts.component.html',
  styleUrl: './listproducts.component.css'
})
export class ListproductsComponent implements OnInit {
  listProducts: Product[] = [
    { id: 1, name: 'Coca Cola', description: 'bebida con azucar', price: 4, stock: 200 },
    { id: 2, name: 'Corona', description: 'bebida con alcohol', price: 5, stock: 300 },
  ]

  constructor() { }
  ngOnInit(): void {

  }

}
