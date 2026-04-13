# Book App - Sprint 5.01: Advanced Angular

This repository contains a book-browsing Angular application developed as part of the Sprint 5 curriculum. The focus of this activity was to build a multi-page SPA using Angular Router, signals, services, and modern reactive patterns introduced in Angular 17+.


## Objectives


* Configure client-side routing with Angular Router, including nested routes and a shared Layout.
* Create a `BooksService` using Angular `signal()` to manage application state.
* Implement a `BookDetails` page reading route parameters via `input()` and `computed()` instead of `ActivatedRoute`.
* Organize the project into `pages/`, `services/`, `interfaces/`, and `layout/` directories.
* Apply Tailwind CSS styles to the application shell and pages.


## Prerequisites


To run this project, ensure you have the following versions (or higher) installed:


* Node.js: v22.x or higher (v24.x recommended)
* npm: 11.x or higher
* Angular CLI: v21.x (`npm install -g @angular/cli`)


## Installation


1. Clone the repository and navigate to the project folder:
   ```bash
   git clone <repo-url>
   cd book-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```


## Running the Application


Start the development server:

```bash
ng serve --open
```

The application will open automatically in your browser at `http://localhost:4200`.


## Core Project Structure


```
src/app/
├── interfaces/
│   └── book.interface.ts       # Book data model
├── services/
│   └── books-service.ts        # Signal-based data service with mock books
├── layout/
│   └── layout.ts / .html       # Shared shell: nav + <router-outlet>
└── pages/
    ├── home/                   # Landing page
    ├── book-list/              # List of all books with route links
    ├── book-details/           # Detail view for a single book (input + computed)
    └── not-found/              # 404 fallback page
```


## Key Angular Concepts Practised


| Concept | Where |
|---|---|
| `signal()` for reactive state | `BooksService` |
| `input()` for route param binding | `BookDetails` |
| `computed()` to derive values | `BookDetails.book` |
| Nested routes with shared Layout | `app.routes.ts` |
| `withComponentInputBinding()` | `app.config.ts` |
| `RouterLink` / `RouterLinkActive` | `Layout` |
| `inject()` instead of constructor DI | `BookDetails`, `NotFound` |


---


##### Author: Irene V. Sahun — GitHub: [isahun](https://github.com/isahun)


##### Created as part of the IT Academy Frontend BootCamp.
