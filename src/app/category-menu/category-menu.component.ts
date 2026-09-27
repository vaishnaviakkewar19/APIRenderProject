import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Category } from '../models/product.model';

@Component({
  selector: 'app-category-menu',
  imports: [],
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.css'
})
export class CategoryMenuComponent implements OnInit {
  productService = inject(ProductService);

  categories = signal<Category[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load categories.');
        this.loading.set(false);
      }
    });
  }

  select(category: string | null): void {
    this.productService.selectcategory(category);
  }
}
