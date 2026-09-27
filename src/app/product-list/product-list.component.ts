import { Component, inject, signal, effect } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(){
    effect(() =>{
      const category = this.productService.selectedcategory();
      const request$ = category ? this.productService.getProductsByCategory(category) : this.productService.getProducts();

      this.loading.set(true);
      this.error.set(null);
      request$.subscribe({
        next: (response) => {
          this.products.set(response.products);
          this.loading.set(false);
        },
        error: () => {
        this.error.set('Failed to load products. Please try again later.');
        this.loading.set(false);
      }
      })
    });
  }
}