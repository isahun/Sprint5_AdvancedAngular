# Book App — Sprint 5.01–5.12: Advanced Angular

A book-browsing application developed as part of the Advanced Angular module of the IT Academy Frontend BootCamp.

The project was built incrementally across twelve activities, covering Angular routing, services, reactive state management, authentication flows, HTTP communication and application architecture.

## Live Demo

**[Open Book App](https://sprint5-advanced-angular.vercel.app/)**

- **Frontend:** Deployed on Vercel.
- **Backend API:** [https://book-app-api-nlx8.onrender.com](https://book-app-api-nlx8.onrender.com)

The application uses a `json-server` REST API hosted on Render.

> **Note:** The backend runs on Render's free tier and may take a little while to respond after periods of inactivity. Demo data is not guaranteed to persist permanently.

## Features

- Book catalogue with API integration.
- Book details and editing.
- Create, update and delete books.
- Bulk book selection and deletion.
- Angular Signals for reactive state management.
- Theme switching with localStorage persistence.
- Simulated user authentication.
- Role-based access control.
- Route protection with Angular guards.
- HTTP interceptor for authentication headers.
- Responsive navigation and application layout.

## Activity Overview

| Activity | Description |
|---|---|
| 5.01 | Basic routing and navigation |
| 5.02 | Route parameters and book details |
| 5.03 | Services and dependency injection |
| 5.04 | HTTP communication and API integration |
| 5.05 | Reactive state management |
| 5.06 | Angular Signals |
| 5.07 | Component communication |
| 5.08 | Book editing and CRUD operations |
| 5.09 | Authentication |
| 5.10 | Route guards and role-based access |
| 5.11 | HTTP interceptors |
| 5.12 | Final integration and application improvements |

## Authentication: Important Note

Authentication is simulated for learning and demonstration purposes.

The application:

- Retrieves test users from the `json-server` API.
- Checks credentials against the demo users collection.
- Generates a mock token on the client side (`mock-jwt-{userId}`).
- Stores the current user in localStorage.
- Uses route guards and an HTTP interceptor to demonstrate protected routes and authenticated requests.

This is **not production-ready authentication**. Credentials are stored in the demo database, and the generated token is not a real JWT. A production application would require a secure backend responsible for authentication, authorization, password hashing and token validation.

### Demo credentials

| Role | Email | Password |
|---|---|---|
| User | `user@example.com` | `password123` |
| Admin | `admin@example.com` | `admin123` |

These credentials are public test accounts and must not be used for real services.

## Tech Stack

- **Framework:** Angular 21
- **Language:** TypeScript
- **Reactive programming:** RxJS
- **State management:** Angular Signals
- **Styling:** Tailwind CSS
- **Mock REST API:** json-server
- **Testing:** Vitest
- **Code quality:** ESLint with angular-eslint
- **Deployment:** Vercel (frontend) and Render (backend)

## Project Structure

```text
src/
├── app/
│   ├── components/
│   │   ├── book-edit-component/
│   │   └── login/
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
│   ├── environment.ts
│   └── environment.development.ts
└── styles.css

db.json
angular.json
package.json
```

## Getting Started

### Requirements

- Node.js
- npm
- Angular CLI (optional)

### Installation

Clone the repository:

```bash
git clone https://github.com/isahun/Sprint5_AdvancedAngular.git
cd Sprint5_AdvancedAngular
npm install
```

### Run the mock API

In a terminal, start json-server:

```bash
npx json-server db.json --host 0.0.0.0 --port 3000
```

The API will be available at:

`http://localhost:3000`

### Run the Angular application

In a second terminal:

```bash
ng serve
```

Open `http://localhost:4200` in your browser.

### Environment configuration

The application uses separate environment configurations:

- `environment.development.ts`: points to the local API (`http://localhost:3000`).
- `environment.ts`: points to the deployed API on Render.

Angular automatically selects the appropriate configuration depending on the build target.

## Testing

The project uses Vitest for unit testing.

Run the test suite:

```bash
npx ng test --watch=false
```

**Latest reported test results:** 16 tests passed across 11 test files.

## Code Quality and Production Build

Run ESLint:

```bash
npx ng lint
```

Build the application:

```bash
npx ng build
```

## Deployment

The application is deployed using two separate services:

| Service | Platform | Purpose |
|---|---|---|
| Angular frontend | Vercel | Hosts the application |
| Mock REST API | Render | Provides books and demo users |

The production Angular build uses the Render API URL configured in `src/environments/environment.ts`.

## Key Angular Concepts

This project explores several Angular concepts and practices:

- Standalone components.
- Dependency injection.
- Angular Router and route parameters.
- Services and separation of concerns.
- HTTP Client and REST API integration.
- RxJS Observables and operators.
- Signals and computed state.
- Component inputs and outputs.
- Route guards and HTTP interceptors.
- Environment-specific configuration.
- Unit testing and linting.

## Author

**Isahun**

Developed as part of the IT Academy Frontend BootCamp — Advanced Angular module.