# ApiRenderProject

An Angular 19 app that fetches products from the public [DummyJSON](https://dummyjson.com/products) API and displays them as cards, with a category menu to filter the list.

## Features

- Product grid showing image, title, category, description, price and rating
- Category menu ("All" + every category from the API) that filters products
- Loading and error states for both products and categories

## Tech stack

- Angular 19 (standalone components, signals, `effect()`, `@if` / `@for` control flow)
- `HttpClient` + RxJS for API calls
- Karma + Jasmine for unit tests

## Getting started

Prerequisites: Node.js and npm.

```bash
npm install
npm start
```

Open `http://localhost:4200/`. The app reloads automatically when you change a source file.

## Scripts

| Command         | What it does                              |
| --------------- | ----------------------------------------- |
| `npm start`     | Runs the dev server (`ng serve`)          |
| `npm run build` | Builds the app into `dist/`               |
| `npm run watch` | Rebuilds on file changes (development)    |
| `npm test`      | Runs unit tests with Karma                |

## API endpoints used

| Endpoint                                                  | Purpose                     |
| --------------------------------------------------------- | --------------------------- |
| `GET https://dummyjson.com/products`                      | All products                |
| `GET https://dummyjson.com/products/categories`           | List of categories          |
| `GET https://dummyjson.com/products/category/{slug}`      | Products in one category    |

## Project structure

See [ARCHITECTURE.md](ARCHITECTURE.md) for what each file does and how data flows through the app.
