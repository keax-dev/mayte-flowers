# Mayte Flowers

[![Idioma: Espanol](https://img.shields.io/badge/Idioma-Espa%C3%B1ol-0a66c2)](./README.md)
[![Language: English](https://img.shields.io/badge/Language-English-2ea44f)](./README.en.md)

Angular 22 product catalogue and marketing website built for a flower exporter brand.

This repository shows how a real Angular application was approached beyond the interface: architecture, routing, SEO, accessibility, typed forms, analytics, performance-minded loading, and maintainable feature boundaries.

## Project Description

This is not a demo with a single page and static cards. It is a structured frontend application designed to reflect the kind of work expected in a professional Angular team:

- standalone Angular architecture with lazy-loaded routes
- feature-based folder organization with public APIs
- reusable UI composition instead of page-sized components
- route-aware SEO with canonical tags and structured data
- accessible contact workflows with typed validation
- analytics abstraction for page views and business events
- resilient catalogue loading and explicit error states
- type safety improvements such as `noUncheckedIndexedAccess`

## Product Scope

The application includes:

- a branded home page with a custom carousel and CTAs
- an about page focused on trust, business context, and buyer information
- a catalogue landing page with flower categories
- category detail pages
- product detail pages with commercial specifications
- an accessible contact dialog for lead capture
- SEO metadata and structured data for marketing visibility

This project was intentionally oriented to showcase practical frontend skills that transfer well to production environments:

- translating business content into a maintainable Angular application
- splitting responsibilities between `core`, `features`, and `shared`
- keeping public feature contracts explicit through local barrel exports
- combining Angular Signals, RxJS, and route resolvers in a clean way
- using Bootstrap as a layout foundation without giving up custom branding
- improving user experience through view transitions, lazy loading, and safer typing

## Tech Stack

- Angular 22
- TypeScript 6
- Angular CDK
- Bootstrap 5
- RxJS 7
- Karma + Jasmine for unit testing

## Engineering Highlights

### Architecture

- `core` contains cross-application concerns such as analytics, configuration, layout, and SEO.
- `features` owns business domains such as `home`, `about`, `catalogue`, and `contact`.
- `shared` contains reusable presentational UI pieces.
- The contact feature exposes a small public API through `features/contact/index.ts`, which keeps consumers decoupled from internal folders.

### Routing and Loading Strategy

- Main pages are lazy-loaded with standalone Angular components.
- Catalogue pages use route resolvers to prepare data before rendering.
- The contact dialog is loaded on demand to keep the initial bundle smaller.
- View transitions are enabled for smoother navigation.

### SEO and Discoverability

- Route-level titles and descriptions
- canonical URL management
- Open Graph and Twitter metadata support
- JSON-LD structured data for organization, website, webpage, product, collection, and breadcrumb schema

### Accessibility

- semantic section structure and ARIA labels
- accessible navbar and carousel controls
- accessible modal dialog behavior
- form validation feedback connected with `aria-describedby` and `aria-invalid`

### Data and State Handling

- typed configuration through an app-level config token
- catalogue data loaded from JSON through a repository layer
- explicit load error state instead of silently failing into empty UI
- Signals used where local UI state is a good fit

### Analytics

- centralized analytics service
- automatic page view tracking on route changes
- custom event tracking for CTA clicks, modal opens, WhatsApp actions, and lead submission states

## Project Structure

```text
src/app
|-- core
|   |-- analytics
|   |-- config
|   |-- layout
|   `-- seo
|-- features
|   |-- about
|   |   `-- data
|   |-- catalogue
|   |   |-- data-access
|   |   |-- models
|   |   |-- pages
|   |   |-- routes
|   |   `-- ui
|   |-- contact
|   |   |-- models
|   |   |-- services
|   |   `-- ui
|   |-- home
|   `-- not-found
`-- shared
    `-- ui
```

## Quality Checks

The project includes:

- unit tests for routing, contact workflows, repository behavior, and home-page interactions
- `typecheck` script for Angular and template type validation
- production build verification

Available scripts:

```bash
npm install
npm start
npm run build
npm test
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run typecheck
```

## Local Setup

### Requirements

- Node.js `^22.22.3` or `^24.15.0` or `^26.0.0`
- npm 11+

### Run Locally

```bash
npm install
npm start
```

Then open `http://localhost:4200/`.

### Build for Production

```bash
npm run build
```

The production output is generated in `dist/mayte-flowres`.
