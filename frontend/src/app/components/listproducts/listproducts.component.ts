import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';

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

  constructor(private _productSevice: ProductService) { }
  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts() {
    this._productSevice.getListProducts().subscribe((data) => {
      console.log(data);
    })
  }

}
