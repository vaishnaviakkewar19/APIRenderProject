import { Component } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { CategoryMenuComponent } from './category-menu/category-menu.component';

@Component({
  selector: 'app-root',
  imports: [ProductListComponent, CategoryMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'api-render-project';
}
