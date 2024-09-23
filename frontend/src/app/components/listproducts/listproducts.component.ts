import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";

@Component({
  selector: 'app-listproducts',
  standalone: true,
  imports: [RouterModule, CommonModule, ProgressBarComponent],
  templateUrl: './listproducts.component.html',
  styleUrl: './listproducts.component.css'
})
export class ListproductsComponent implements OnInit {
  listProducts: Product[] = []
  loading: boolean = false;

  constructor(private _productSevice: ProductService) { }
  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts() {
    this.loading = true;
    this._productSevice.getListProducts().subscribe((data: Product[]) => {
      this.listProducts = data;
      this.loading = false;
    })
  }

  deleteProduct(id: number) {
    this.loading = true;
    this._productSevice.deleteProduct(id).subscribe(() => {
      this.getListProducts();
    })
  }

}
