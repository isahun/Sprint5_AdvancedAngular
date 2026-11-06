# Book App — Sprint 5.01–5.12: Advanced Angular

A book management application built with **Angular 21** as part of the IT Academy Frontend BootCamp. Developed incrementally across twelve activities, the project explores Angular's routing system, HTTP communication, reactive state management, authentication, and application architecture.

The application uses **json-server** as a mock REST API and demonstrates modern Angular patterns, including standalone components, Signals, functional route guards, and HTTP interceptors.

## Features

- Browse and manage books with full CRUD operations.
- View book details and edit existing entries.
- Select multiple books and delete them in bulk.
- Manage application state using Angular Signals.
- Switch between light and dark themes, with preferences persisted in `localStorage`.
- Sign in and out using a simulated authentication flow.
- Protect routes and restrict access according to user roles.
- Automatically attach an authorization header to outgoing HTTP requests.
- Responsive navigation and mobile-friendly layout.

## Activity Overview

### 5.01 — Basic Routing and Static Routes

- Configured Angular Router and created the initial navigation structure.
- Generated standalone page components: `Home`, `BookList`, `BookDetails`, and `NotFound`.
- Defined static routes and a wildcard fallback.
- Implemented navigation with `routerLink` and `routerLinkActive`.
- Installed Tailwind CSS and styled the navigation bar.

### 5.02 — Dynamic Routes and Programmatic Navigation

- Created the `Book` interface.
- Implemented dynamic routes using book IDs.
- Initially used a signal-based service containing mock book data.
- Added navigation between the book list and detail views.
- Refactored `BookDetails` to use `input()` and `computed()` instead of `ActivatedRoute` for route parameter handling.

### 5.03 — Layout Component and Nested Routes

- Created a reusable `Layout` component containing the navigation bar and `router-outlet`.
- Restructured routes using nested child routes.
- Simplified the root `App` component.
- Configured `withComponentInputBinding()` to bind route parameters to component inputs.
- Added programmatic navigation to the not-found page.

### 5.04 — HTTP Data Fetching with HttpClient

- Installed json-server and created a mock database in `db.json`.
- Configured Angular `HttpClient`.
- Replaced hardcoded book data with HTTP requests.
- Introduced `BookApiService` to handle API communication.
- Implemented error handling using RxJS `catchError`.
- Centralised the API base URL in the environment configuration.
- Explored converting Observables into Signals with `toSignal()`.

### 5.05 — Full CRUD with HttpClient

- Implemented `GET`, `POST`, `PUT`, and `DELETE` operations.
- Created `BookEditComponent` for editing book information.
- Used signal-based `input()` and `output()` APIs for component communication.
- Used `effect()` to synchronise form fields with incoming book data.
- Refactored the parent-child communication flow so that the parent manages book operations.

### 5.06 — HTTP Service Testing with Vitest

- Configured unit tests using Vitest and Angular's `TestBed`.
- Created tests for `BookApiService`.
- Used `HttpTestingController` to intercept and verify HTTP requests.
- Tested CRUD operations and HTTP error handling.
- Updated component tests to reflect the application's current structure.

### 5.07 — Local Component State Management with Signals

- Adopted Angular Signals for local state management.
- Applied `ChangeDetectionStrategy.OnPush` to components.
- Used `signal()`, `set()`, and `update()` to manage reactive state.
- Refined conditional state updates when deleting books.

### 5.08 — Global State Management with Signals in Services

- Introduced `BookService` to manage shared book state independently of API communication.
- Exposed read-only Signals for shared state.
- Implemented multi-selection using a `Set` of selected book IDs.
- Added bulk deletion functionality.
- Refactored `BookList` to consume shared state through the service.

### 5.09 — Advanced Signal Patterns and Effects

- Created `ThemeService` to manage the application's theme.
- Used `effect()` to synchronise theme changes with the DOM and `localStorage`.
- Implemented a persistent light/dark theme toggle.
- Explored browser storage as a persistence mechanism for application state.

### 5.10 — Authentication Service with Signals and Login Form

- Created `User` and `AuthResponse` interfaces.
- Implemented `AuthService` using Angular Signals.
- Developed a login form using Reactive Forms and validators.
- Implemented login and logout functionality.
- Persisted the current user in `localStorage`.
- Added helper methods for retrieving the token and checking user roles.
- Integrated authentication controls into the application layout.
- Updated the navigation bar with responsive desktop and mobile layouts.

### 5.11 — Route Protection with Guards and Role Control

- Created a functional route guard using `CanActivateFn`.
- Redirected unauthenticated users to the login page.
- Implemented role-based access checks using route data.
- Protected application routes and added an admin-only page.
- Created a dedicated unauthorized-access page.
- Added conditional navigation links based on user roles.

### 5.12 — HTTP Interceptor for Authorization Tokens

- Created a functional HTTP interceptor using `HttpInterceptorFn`.
- Automatically attached a Bearer token to outgoing HTTP requests when available.
- Used request cloning to set the `Authorization` header.
- Implemented global handling for HTTP 401 and 403 responses.
- Registered the interceptor through `provideHttpClient()` and `withInterceptors()`.

## Authentication: Important Note

The authentication flow is **simulated for learning purposes** and is not intended for production use.

- User credentials are checked against the mock `users` collection provided by json-server.
- The login request uses a `GET` query with email and password parameters.
- A mock token is generated on the client side (`mock-jwt-{userId}`).
- The current user is persisted in browser `localStorage`.
- Functional guards demonstrate route protection and role-based navigation.
- The HTTP interceptor demonstrates how an authorization token can be attached to outgoing requests and how authentication-related HTTP errors can be handled.

**This is not a secure authentication implementation.** Credentials are not verified by a real authentication server, the generated token is not a valid JWT, and client-side route guards do not provide backend access control. A production application would require server-side credential verification, secure token management, and authorization enforced by the backend.

## Testing

The project uses **Vitest** with Angular's `TestBed`.

Run the test suite with:

```bash
npx ng test --watch=false
```

The tests cover HTTP service operations, error handling, and component creation.

The latest validation results:

- **11 test files passed**
- **16 tests passed**

## Code Quality

ESLint is configured using `angular-eslint`.

Run linting with:

```bash
npx ng lint
```

Build the application with:

```bash
npx ng build
```

## Tech Stack

| Technology | Purpose |
|---|---|
| Angular 21 | Frontend framework |
| TypeScript | Application logic and type safety |
| RxJS | Asynchronous operations and HTTP streams |
| Angular Signals | Reactive state management |
| Angular Router | Navigation and route protection |
| Angular HttpClient | REST API communication |
| Reactive Forms | Form handling and validation |
| json-server | Mock REST API |
| Vitest | Unit testing |
| Tailwind CSS 4 | Utility-first styling |
| ESLint / angular-eslint | Code quality and linting |

## Project Structure

```text
src/
├── app/
│   ├── components/
│   │   ├── login/
│   │   └── book-edit-component/
│   ├── guards/
│   │   └── auth-guard.ts
│   ├── interceptors/
│   │   └── auth-interceptor.ts
│   ├── interfaces/
│   │   ├── auth-response.interface.ts
│   │   ├── book.interface.ts
│   │   └── user.interface.ts
│   ├── layout/
│   ├── pages/
│   │   ├── admin/
│   │   ├── book-details/
│   │   ├── book-list/
│   │   ├── home/
│   │   ├── not-found/
│   │   └── unauthorized/
│   └── services/
│       ├── auth.service.ts
│       ├── book-api.service.ts
│       ├── book.service.ts
│       └── theme.service.ts
├── environments/
│   └── environment.ts
└── styles.css
```

## Getting Started

### Prerequisites

- Node.js v22 or higher (v24 recommended)
- npm 11 or higher
- Angular CLI v21

### Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/isahun/Sprint5_AdvancedAngular.git
cd Sprint5_AdvancedAngular/book-app
npm install
```

### Running the Application

The application requires two processes running in parallel: json-server and the Angular development server.

**Terminal 1 — Mock REST API**

```bash
npx json-server db.json
```

The API will be available at `http://localhost:3000`.

**Terminal 2 — Angular application**

```bash
ng serve --open
```

The application will be available at `http://localhost:4200`.

## Key Angular Concepts Practised

| Concept | Implementation |
|---|---|
| Standalone components | Application components |
| Static and dynamic routing | `app.routes.ts` |
| Nested routes | `Layout` |
| Route parameter binding | `input()` |
| Programmatic navigation | `Router.navigate()` |
| Dependency injection | `inject()` |
| HTTP requests | `BookApiService` |
| RxJS error handling | `catchError()` |
| Signals | `BookService`, `AuthService`, `ThemeService` |
| Derived reactive state | `computed()` |
| Reactive side effects | `effect()` |
| Component communication | `input()` and `output()` |
| Change detection | `OnPush` |
| Global state management | Shared services |
| Persistent browser storage | `localStorage` |
| Functional route guards | `CanActivateFn` |
| Role-based access | Route data and role checks |
| Functional HTTP interceptors | `HttpInterceptorFn` |
| HTTP unit testing | `HttpTestingController` |
| Reactive Forms | Login form |
| Utility-first styling | Tailwind CSS |

---

**Author:** Irene V. Sahun — [GitHub](https://github.com/isahun)

Created as part of the **IT Academy Frontend BootCamp**.