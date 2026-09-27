import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, ProductsResponse } from '../models/product.model';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://dummyjson.com/products';

  selectedcategory = signal<string | null>(null);

  selectcategory(category: string | null) : void{
    this.selectedcategory.set(category);
  }
  getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(this.apiUrl);
  }
  getCategories(): Observable<Category[]> {
  return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }
  getProductsByCategory(category: string): Observable<ProductsResponse>{
    return this.http.get<ProductsResponse>(`${this.apiUrl}/category/${category}`);
  }
  
}
