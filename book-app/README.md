# BookApp | Basic Angular Routing Configuration (Sprint 5.1)

A foundational **Angular 21+** application demonstrating static and dynamic route configuration, navigation with active link highlighting, and responsive styling with **Tailwind CSS v4**. Built as the first step of a multi-sprint digital library project.

---

## Key Features

- **Angular Router Setup:** Full configuration of `provideRouter` within the standalone application architecture, wiring four page components to their respective routes.
- **Static & Dynamic Routes:** Defines both static paths (`/`, `/books`) and a dynamic segment (`/books/:bookId`) to support future parameterised book detail pages.
- **Wildcard 404 Handling:** A catch-all `**` route renders a `NotFound` component for any unrecognised URL, preventing blank screens.
- **Active Link Highlighting:** Navigation links use `routerLinkActive` with `[routerLinkActiveOptions]="{ exact: true }"` to apply bold and underline styling only to the currently active route.
- **Tailwind CSS v4 Styling:** The navigation bar is styled exclusively with Tailwind utility classes; the active link state is expressed via a single `.active-link` utility composed with `@apply`.

---

## Tech Stack & Architecture

- **Framework:** Angular 21+ (Standalone Architecture)
- **Styling:** Tailwind CSS v4 (via `@import 'tailwindcss'`)
- **Testing:** Vitest
- **Language:** TypeScript 5.9
- **State Pattern:** Minimal — no services yet; components are pure presentational stubs.

### File Structure & Responsibilities

| Path | Responsibility |
| :--- | :--- |
| `src/app/app.routes.ts` | Defines all application routes: root path, static paths, dynamic segment, and wildcard. |
| `src/app/app.ts` | Root component — imports `RouterOutlet`, `RouterLinkWithHref`, and `RouterLinkActive`. |
| `src/app/app.html` | Navigation bar with `routerLink` / `routerLinkActive` and the `<router-outlet>` host. |
| `src/app/app.config.ts` | Application bootstrap config — wires `provideRouter(routes)`. |
| `src/app/components/home/` | Landing page stub: `<h1>Benvingut a la Biblioteca Digital</h1>`. |
| `src/app/components/book-list/` | Book list page stub: `<h1>Llista de llibres</h1>`. |
| `src/app/components/book-details/` | Dynamic detail page stub: bound to the `books/:bookId` route. |
| `src/app/components/not-found/` | 404 fallback page, rendered by the `**` wildcard route. |
| `src/styles.css` | Global Tailwind import and `.active-link` utility definition. |

---

## Routing Configuration

```typescript
// src/app/app.routes.ts
export const routes: Routes = [
  { path: '',              component: Home },
  { path: 'books',         component: BookList },
  { path: 'books/:bookId', component: BookDetails },
  { path: '',              redirectTo: 'home', pathMatch: 'full' },
  { path: '**',            component: NotFound },
];
```

| Route | Component | Notes |
| :--- | :--- | :--- |
| `''` | `Home` | Root path, exact match. |
| `'books'` | `BookList` | Static path for the book catalogue. |
| `'books/:bookId'` | `BookDetails` | Dynamic segment — `:bookId` will be consumed in a later sprint. |
| `'**'` | `NotFound` | Catch-all for any unrecognised URL. |

---

## Getting Started

### 1. Prerequisites
- **Node.js:** v22.0.0 or higher
- **Angular CLI:** `npm install -g @angular/cli`

### 2. Installation
Clone the repository:
```bash
git clone https://github.com/isahun/Sprint5_AdvancedAngular.git
```

Navigate to the project folder:
```bash
cd Sprint5_AdvancedAngular/book-app
```

Install dependencies:
```bash
npm install
```

### 3. Development Server
```bash
npm start
```
Navigate to `http://localhost:4200/`.

### 4. Run Tests
```bash
npm test
```

---

## Styling Notes

- **Tailwind CSS v4** is imported globally via `@import 'tailwindcss'` in `src/styles.css` — no config file required.
- The navigation bar uses a blue background (`bg-blue-600`) with amber text (`text-amber-100`) and even spacing (`justify-evenly`).
- Active links receive `font-bold underline text-amber-300` via the `.active-link` class composed with `@apply`, keeping Tailwind logic out of the template.

---

## Branch Strategy

| Branch | Purpose |
| :--- | :--- |
| `main` | Production-ready code — clean, no explanatory comments. |
| `develop` | Integration branch for sprint features. |
| `feature/routes-setup` | Feature branch where routing and navigation were implemented. |

---

##### Author: Irene V. Sahun — GitHub: [isahun](https://github.com/isahun)
##### Created as part of the IT Academy Frontend BootCamp — Sprint 5: Advanced Angular.
