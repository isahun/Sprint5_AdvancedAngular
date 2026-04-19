# Book App - Sprint 5.01 - 5.09: Advanced Angular

This repository contains a book-browsing Angular application developed across nine activities in the Sprint 5 curriculum. The project is built incrementally: each activity adds a new layer of routing, services, and reactive patterns on top of the previous one.


## Activity Overview


### 5.01 — Basic Routing and Static Routes

The goal of this activity was to configure Angular Router and set up the basic navigation structure of the application.

**Objectives:**
* Configure the Angular Router.
* Create and associate components to routes.
* Implement basic navigation using `routerLink`.

**Steps performed:**
* Generated a new Angular project `book-app` with standalone components.
* Created four page components: `Home`, `BookList`, `BookDetails`, `NotFound`.
* Configured static routes in `app.routes.ts`: root path, `books`, `books/:bookId`, and the `**` wildcard fallback.
* Added a navigation bar in `app.html` using `routerLink` and `routerLinkActive` with `routerLinkActiveOptions`.
* Installed **Tailwind CSS** and applied styles to the navigation bar.


### 5.02 — Dynamic Routes and Programmatic Navigation

The goal of this activity was to implement dynamic routes for individual book detail pages and navigate between routes programmatically.

**Objectives:**
* Define routes with URL parameters.
* Access route parameters using `ActivatedRoute`.
* Use `Router` for programmatic navigation.

**Steps performed:**
* Created a `Book` interface (`id`, `title`, `author`, `category`) in a dedicated file.
* Created `BooksService` with a `signal`-based array of 3 mock books.
* Updated `BookList` to inject the service and render book links using `[routerLink]="['/books', book.id]"`.
* Implemented `BookDetails` to read the `bookId` route parameter, look up the book, and display it — with an `@if` fallback for unknown IDs.
* Added a "Tornar al llistat" button using `Router.navigate()`.
* Applied Tailwind styles to the list and detail views.
* **Refactored** `BookDetails` to read the route parameter via `input()` (Input Signal) and `computed()` instead of `ActivatedRoute` + `OnInit`.


### 5.03 — Layout Component and Nested Routes

The goal of this activity was to extract the shared application shell into a dedicated `Layout` component and restructure routes as nested children.

**Objectives:**
* Create a reusable `Layout` component that holds the nav bar and the `<router-outlet>`.
* Restructure routing so that all page routes are children of the Layout route.
* Clean up the root `App` component to act only as an entry point.

**Steps performed:**
* Generated a `Layout` component containing the navigation bar (`RouterLink`, `RouterLinkActive`) and `<router-outlet>`.
* Refactored `app.routes.ts` to nest `Home`, `BookList`, and `BookDetails` as children of the Layout route, while keeping `NotFound` at the top level.
* Stripped the navigation markup from `app.html`, leaving only `<router-outlet />`.
* Cleaned up `App` imports, removing `RouterLinkWithHref` and `RouterLinkActive`.
* Added `withComponentInputBinding()` to `provideRouter()` in `app.config.ts` to enable automatic route-param-to-input binding.
* Updated `NotFound` with a `goBack()` method using `Router.navigate()` and applied Tailwind styles.


### 5.04 — HTTP Data Fetching with HttpClient

The goal of this activity was to replace the hardcoded mock data with real HTTP requests to a simulated REST API, and learn to handle asynchronous data reactively using Observables and Signals.

**Objectives:**
* Configure `HttpClient` in the Angular application.
* Implement a `GET` request in `BooksService` to fetch books from an API.
* Handle HTTP errors with `catchError` and a dedicated `handleError` method.
* Convert the returned Observable into a Signal using `toSignal()` for use in templates.

**Steps performed:**
* Installed `json-server` and created `db.json` at the project root with 4 mock books.
* Added `provideHttpClient()` to `app.config.ts`.
* Created `src/environments/environment.ts` with the `apiUrl` (`http://localhost:3000/`) to avoid hardcoding URLs in the service.
* Rewrote `BooksService`: removed the hardcoded `signal`-based array, injected `HttpClient` via `inject()`, and implemented `getBooks()` returning an `Observable<Book[]>` with `.pipe(catchError(...))`.
* Implemented `handleError()` to distinguish client-side network errors from server-side HTTP errors.
* Updated `BookList` to call `toSignal(this.service.getBooks(), { initialValue: [] })` and consume the resulting signal in the template.
* Updated `BookDetails` to also use `toSignal()` and derive the displayed book via `computed(() => this.books().find(...))`.


### 5.05 — Full CRUD with HttpClient

The goal of this activity was to extend the application with full create, update, and delete operations using HTTP requests, and to implement a component communication pattern with inputs and outputs.

**Objectives:**
* Implement `POST`, `PUT`, and `DELETE` requests in `BooksService`.
* Create a child component (`BookEditComponent`) for editing book data.
* Use `input()` and `output()` to communicate between parent and child components.
* Use `effect()` to synchronise form fields with incoming data.

**Steps performed:**
* Extended `BooksService` with `addBook()` (POST), `updateBook()` (PUT), `deleteBook()` (DELETE), and `getBookById()` (GET by id).
* Created `BookEditComponent` with local signals for form fields (`title`, `author`, `category`), an `input()` for the current book, and a `bookSaved` output.
* Used `effect()` in `BookEditComponent` to initialise form fields whenever the parent passes a new book.
* Updated `BookDetails` to receive `bookId` and emit `bookDeleted`, `bookUpdated`, and `goBack` outputs — delegating all service calls to the parent.
* Updated `BookList` as the root component managing state: handles all CRUD responses and updates the local books signal accordingly.


### 5.06 — HTTP Service Testing with Vitest

The goal of this activity was to write unit tests for the HTTP service layer using Angular's `HttpTestingController`.

**Objectives:**
* Configure and use `HttpTestingController` to intercept and assert HTTP requests.
* Test all CRUD methods of the service.
* Fix broken default spec files from the Angular scaffold.

**Steps performed:**
* Created `book-api.service.spec.ts` with full test coverage for `BookApiService`: GET, POST, PUT, DELETE, and error handling.
* Fixed broken default spec files: removed the failing `app.spec.ts`, updated `layout.spec.ts` and `book-details.spec.ts` to match the current component structure.


### 5.07 — Local Component State Management with Signals

The goal of this activity was to refactor existing components to use Angular Signals for local state management, improving reactivity and adopting best practices for change detection.

**Objectives:**
* Convert local state variables to `signal()`.
* Update signals using `set()` and `update()`.
* Use `computed()` for derived state.
* Apply `ChangeDetectionStrategy.OnPush` to all components.

**Steps performed:**
* Added `changeDetection: ChangeDetectionStrategy.OnPush` to all components: `Home`, `NotFound`, `Layout`, `BookDetails`, `BookList`, and `BookEditComponent`.
* Refactored `deleteBook()` in `BookList` to use `signal.update()` instead of `set(null)` — only clears `selectedBookId` if it matches the deleted book's ID, avoiding unnecessary state resets.
* Fixed an unused variable warning in `catchError` by renaming `err` to `_err`.


### 5.08 — Global State Management with Signals in Services

The goal of this activity was to lift local component state up into a shared service so that multiple components can consume and mutate the same reactive state without prop-drilling.

**Objectives:**
* Move component-local signals into a shared Angular service.
* Expose derived state via `computed()` in the service.
* Allow multi-selection of books from the list view.

**Steps performed:**
* Created `BookService` (distinct from `BookApiService`) with signals for the books array, the selected book ID, and a set of multi-selected book IDs.
* Exposed `computed()` signals: `selectedBook`, `selectedCount`, and `hasSelection`.
* Refactored `BookList` to read and write state exclusively through `BookService`, removing all local signals that duplicated service state.
* Added a multi-selection UI to `BookList`: checkboxes per book row and a bulk-action bar that shows when one or more books are selected.


### 5.09 — Advanced Signal Patterns and Effects

The goal of this activity was to implement cross-cutting reactive features using `effect()` and to demonstrate persistence patterns with `localStorage`.

**Objectives:**
* Use `effect()` to synchronise application state with browser APIs.
* Implement a theme toggle (dark/light) that persists across page reloads.
* Apply advanced signal patterns in a real-world scenario.

**Steps performed:**
* Created `ThemeService` with a `theme` signal initialised from `localStorage` and an `effect()` that applies the corresponding CSS class to `<body>` and persists the choice to `localStorage` on every change.
* Added a theme toggle button to `Layout` that calls `ThemeService.toggle()`.
* Added `dark` and `light` CSS class rules to `styles.css` for the full-app theme switch.
* **Updated `feature/hardcodedData` branch**: replaced the hardcoded signal-based book array in `BooksService` with a `localStorage`-backed implementation, as required by the 5.09 exercise brief. Books are loaded from `localStorage` on init and written back on every mutation.


## Testing

The project uses **Vitest** with Angular's `TestBed`. Tests are written and ready to run — no additional setup required.

```bash
ng test
```

The main test suite is `BookApiService` ([src/app/services/book-api.service.spec.ts](src/app/services/book-api.service.spec.ts)), which covers all HTTP methods using `HttpTestingController`:

- `GET /books` — retrieves all books
- `POST /books` — adds a new book (with `Omit<Book, 'id'>` payload)
- `PUT /books/:id` — updates an existing book
- `DELETE /books/:id` — deletes a book
- Error handling — graceful response to HTTP errors (e.g. 404)

The remaining spec files (components and services) contain the default Angular scaffold tests and pass as-is.


## Branch Reference

| Branch | Description |
|---|---|
| `main` | Final state — activities 5.04 to 5.09 including HTTP, Signals, global state and theme |
| `feature/hardcodedData` | State after 5.01–5.03 updated with `localStorage` persistence (required by 5.09) |
| `hardcodedCommented` | Same as `feature/hardcodedData` with explanatory comments in Catalan |
| `crudCommented` | Extended version with full CRUD operations, with comments |
| `feature/signals-local-state` | Signals refactor: `OnPush` on all components, `update()` in `deleteBook` |
| `feature/global-state-signals` | Global state in `BookService` (5.08) + `ThemeService` with `effect()` (5.09) |


## Prerequisites


* Node.js: v22.x or higher (v24.x recommended)
* npm: 11.x or higher
* Angular CLI: v21.x — `npm install -g @angular/cli`


## Installation


```bash
git clone <repo-url>
cd book-app
npm install
```


## Running the Application

This project requires two servers running in parallel: the Angular dev server and the json-server mock API.

```bash
# Terminal 1 — Mock REST API (http://localhost:3000)
npx json-server db.json

# Terminal 2 — Angular dev server (http://localhost:4200)
ng serve --open
```


## Project Structure


```
src/app/
├── interfaces/
│   └── book.interface.ts         # Book data model
├── environments/
│   └── environment.ts            # API URL config (apiUrl)
├── services/
│   └── books-service.ts          # HTTP service: GET /books with error handling
├── layout/
│   └── layout.ts / .html / .css  # Shared shell: nav bar + <router-outlet>
└── pages/
    ├── home/                     # Landing page
    ├── book-list/                # List of all books with dynamic route links
    ├── book-details/             # Detail view (input() + computed() for route param)
    └── not-found/                # 404 fallback with programmatic back navigation
```


## Key Angular Concepts Practised


| Concept | Activity | Where |
|---|---|---|
| `routerLink` / `routerLinkActive` | 5.01 | `app.html` → `Layout` |
| Wildcard and redirect routes | 5.01 | `app.routes.ts` |
| `BooksService` with `signal()` | 5.02 | `books-service.ts` |
| Dynamic route param `/:bookId` | 5.02 | `app.routes.ts` |
| `ActivatedRoute` param reading | 5.02 | `BookDetails` (initial) |
| `Router.navigate()` | 5.02 | `BookDetails`, `NotFound` |
| `@if` conditional rendering | 5.02 | `book-details.html` |
| `input()` for route param binding | 5.02 refactor | `BookDetails` |
| `computed()` to derive state | 5.02 refactor | `BookDetails.book` |
| `inject()` instead of constructor DI | 5.02–5.03 | `BookDetails`, `NotFound` |
| Nested routes with shared Layout | 5.03 | `app.routes.ts` |
| `withComponentInputBinding()` | 5.03 | `app.config.ts` |
| `provideHttpClient()` | 5.04 | `app.config.ts` |
| `HttpClient.get<T>()` | 5.04 | `BooksService` |
| `catchError` / `handleError` | 5.04 | `BooksService` |
| `environment.ts` for API config | 5.04 | `environments/` |
| `toSignal()` from Observable | 5.04 | `BookList`, `BookDetails` |
| `HttpClient.post/put/delete` | 5.05 | `BooksService` |
| `input()` / `output()` component communication | 5.05 | `BookEditComponent` ↔ `BookDetails` ↔ `BookList` |
| `effect()` to sync signals with side effects | 5.05 | `BookEditComponent` |
| `Omit<T, K>` TypeScript utility type | 5.05 | `BooksService.addBook()` |
| `HttpTestingController` for HTTP unit tests | 5.06 | `book-api.service.spec.ts` |
| `ChangeDetectionStrategy.OnPush` | 5.07 | All components |
| `signal.update()` for conditional state update | 5.07 | `BookList.deleteBook()` |
| Global state signals in a shared service | 5.08 | `BookService` |
| `computed()` for derived global state | 5.08 | `BookService` (`selectedBook`, `selectedCount`, `hasSelection`) |
| Multi-selection UI with signals | 5.08 | `BookList` |
| `effect()` to sync state with browser APIs | 5.09 | `ThemeService` |
| `localStorage` persistence via `effect()` | 5.09 | `ThemeService`, `feature/hardcodedData` branch |
| Theme toggle (dark/light) | 5.09 | `Layout`, `ThemeService`, `styles.css` |
| Tailwind CSS | 5.01–5.09 | Throughout |


---


##### Author: Irene V. Sahun — GitHub: [isahun](https://github.com/isahun)


##### Created as part of the IT Academy Frontend BootCamp.
