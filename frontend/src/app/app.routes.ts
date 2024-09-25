import { Routes } from '@angular/router';
import { ListproductsComponent } from './components/listproducts/listproducts.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { FullcalendarComponent } from './components/fullcalendar/fullcalendar.component';
import { GraficsComponent } from './components/grafics/grafics.component';

export const routes: Routes = [
    { path: '', component: ListproductsComponent },
    { path: 'add', component: AddEditProductComponent },
    { path: 'edit/:id', component: AddEditProductComponent },
    { path: 'mapa', component: MapaComponent },
    { path: 'fullcalendar', component: FullcalendarComponent },
    { path: 'grafics', component: GraficsComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
