# Architecture

## Overview

The app has two components that share state through one service:

```
                 ┌──────────────────────┐
                 │     AppComponent     │
                 └──────────┬───────────┘
              ┌─────────────┴──────────────┐
              ▼                            ▼
   ┌──────────────────────┐     ┌──────────────────────┐
   │ CategoryMenuComponent│     │ ProductListComponent │
   └──────────┬───────────┘     └──────────┬───────────┘
   select()   │  sets signal     reads     │ effect() re-runs
              ▼                  signal    ▼
         ┌─────────────────────────────────────┐
         │ ProductService                       │
         │  selectedcategory = signal<string>   │
         └──────────────────┬──────────────────┘
                            │ HttpClient
                            ▼
                 https://dummyjson.com/products
```

## Data flow

1. On startup, `CategoryMenuComponent` calls `getCategories()` and shows one button per category, plus "All".
2. `ProductListComponent` has an `effect()` that reads `selectedcategory()`. It runs once at startup (value `null`, so it loads all products).
3. When the user clicks a category, `select()` calls `productService.selectcategory(slug)`, which updates the signal.
4. The signal change re-runs the effect in `ProductListComponent`. It clears any previous error, shows the loading state, and calls `getProductsByCategory(slug)` (or `getProducts()` for "All").
5. The response fills the `products` signal and the template shows the cards.

## Files

### Entry point

| File | Purpose |
| --- | --- |
| [src/main.ts](src/main.ts) | Starts the app with `AppComponent` and `appConfig` |
| [src/index.html](src/index.html) | Host page containing `<app-root>` |
| [src/styles.css](src/styles.css) | Global styles |

### App shell

| File | Purpose |
| --- | --- |
| [src/app/app.config.ts](src/app/app.config.ts) | App-wide providers: zone change detection and `provideHttpClient()` |
| [src/app/app.component.ts](src/app/app.component.ts) | Root component; imports the two feature components |
| [src/app/app.component.html](src/app/app.component.html) | Lays out `<app-category-menu>` above `<app-product-list>` |

### Service

| File | Purpose |
| --- | --- |
| [src/app/services/product.service.ts](src/app/services/product.service.ts) | All API calls (`getProducts`, `getCategories`, `getProductsByCategory`) and the shared `selectedcategory` signal |

### Models

| File | Purpose |
| --- | --- |
| [src/app/models/product.model.ts](src/app/models/product.model.ts) | TypeScript interfaces: `Product`, `ProductsResponse`, `Category` |

### Components

| File | Purpose |
| --- | --- |
| [src/app/category-menu/category-menu.component.ts](src/app/category-menu/category-menu.component.ts) | Loads categories on init and updates the selected category on click |
| [src/app/category-menu/category-menu.component.html](src/app/category-menu/category-menu.component.html) | Category buttons; the active one is highlighted |
| [src/app/product-list/product-list.component.ts](src/app/product-list/product-list.component.ts) | Reloads products whenever the selected category changes; holds `products`, `loading`, `error` signals |
| [src/app/product-list/product-list.component.html](src/app/product-list/product-list.component.html) | Loading / error / product-card grid |

Each component also has a `.css` file for its styles and a `.spec.ts` file for unit tests.
