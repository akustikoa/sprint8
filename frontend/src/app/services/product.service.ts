import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAappUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAappUrl = environment.endpoint;
    this.myApiUrl = 'api/productos/'
  }

  getListProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.myAappUrl}${this.myApiUrl}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAappUrl}${this.myApiUrl}${id}`);
  }
}
