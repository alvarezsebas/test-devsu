import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = 'http://localhost:3002/bp/products';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
  return this.http
    .get<ApiResponse<Product[]>>(this.api)
    .pipe(map(response => response.data));
}

  create(product: Product): Observable<Product> {
    console.log("Me llamo");
    
    console.log(product);
    
    return this.http.post<Product>(this.api, product);
  }

  update(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}/${id}`, product);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  validateId(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.api}/verification/${id}`);
  }
}
