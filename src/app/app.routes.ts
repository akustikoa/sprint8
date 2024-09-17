import { Routes } from '@angular/router';
import { ListproductsComponent } from './components/listproducts/listproducts.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';

export const routes: Routes = [
    { path: '', component: ListproductsComponent },
    { path: 'add', component: AddEditProductComponent },
    { path: 'edit/:id', component: AddEditProductComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
