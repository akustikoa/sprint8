import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, ProgressBarComponent],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent {
  form: FormGroup
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(private fb: FormBuilder,
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required]
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    console.log(this.id);

  }

  ngOnInit(): void {

    if (this.id != 0) {
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }

  }
  getProduct(id: number) {
    this.loading = true;
    this._productService.getProduct(id).subscribe((data: Product) => {
      console.log(data);
      this.loading = false;
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
      });
    })
  }

  addProduct() {

    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock
    }


    if (this.id !== 0) {
      this.loading = true;
      product.id = this.id;
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.loading = false;
        this.toastr.success(`El producto ${product.name} fue actualizado con éxito`, 'Producto actualizado');
        this.router.navigate(['/']);
      })
    } else {
      this.loading = true;
      this._productService.saveProduct(product).subscribe(() => {
        this.loading = false;
        this.toastr.success(`El producto ${product.name} fue registrado con éxito`, 'Producto registrado');
        this.router.navigate(['/']);
      })
    }


  }


}
