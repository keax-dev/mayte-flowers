# Mayte Flowers

[![Idioma: Espanol](https://img.shields.io/badge/Idioma-Espa%C3%B1ol-0a66c2)](./README.md)
[![Language: English](https://img.shields.io/badge/Language-English-2ea44f)](./README.en.md)

Angular 22 product catalogue and marketing website built for a flower exporter brand.

This repository shows how a real Angular application was approached beyond the interface: architecture, routing, SEO, accessibility, typed forms, analytics, hybrid rendering with prerendering, performance-minded loading, and maintainable feature boundaries.

## Project Description

This is not a demo with a single page and static cards. It is a structured frontend application designed to reflect the kind of work expected in a professional Angular team:

- Standalone Angular architecture with lazy-loaded routes
- Feature-based folder organization with public APIs
- Reusable UI composition instead of page-sized components
- Route-aware SEO with canonical tags and structured data
- Accessible contact workflows with typed validation
- Analytics abstraction for page views and business events
- Resilient catalogue loading and explicit error states
- Type safety improvements such as `noUncheckedIndexedAccess`

## Product Scope

The application includes:

- A branded home page with a custom carousel and CTAs
- An about page focused on trust, business context, and buyer information
- A catalogue landing page with flower categories
- Category detail pages
- Product detail pages with commercial specifications
- An accessible contact dialog for lead capture
- SEO metadata and structured data for marketing visibility

This project was intentionally oriented to showcase practical frontend skills that transfer well to production environments:

- Translating business content into a maintainable Angular application
- Splitting responsibilities between `core`, `features`, and `shared`
- Keeping public feature contracts explicit through local barrel exports
- Combining Angular Signals, RxJS, and route resolvers in a clean way
- Using Bootstrap as a layout foundation without giving up custom branding
- Improving user experience through view transitions, lazy loading, and safer typing

## Tech Stack

- Angular 22
- TypeScript 6
- Angular CDK
- Angular SSR for hybrid rendering with static prerendering
- Bootstrap 5
- RxJS 7
- Karma + Jasmine for unit testing
- Playwright for end-to-end testing
- GitHub Actions for CI/CD
- Firebase Hosting for multi-site deployments

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

### Hybrid Rendering

- The project uses `@angular/ssr` in static mode, so `ng build` generates prerendered HTML plus a hydratable client bundle.
- Routes such as `home`, `about-us`, `gallery`, and catalogue detail pages are pre-rendered during the build.
- Parameterized catalogue routes are discovered from `src/assets/data/catalogue.json`, which avoids maintaining manual prerender lists.
- Non-prerendered route fallback stays client-side, keeping deployment simple on Firebase Hosting.

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

### Runtime Configuration

- The application loads public configuration from `src/assets/config/`.
- On `localhost`, it consumes `app-config.local.json`; outside the local environment, it consumes `app-config.json`.
- Values such as `siteUrl`, `gaMeasurementId`, contact details, base branding, and external links can be changed without rebuilding the bundle.
- The configuration is resolved during bootstrap in `src/main.ts` and injected into the application through `APP_CONFIG`.
- In production, the resolved config is also serialized into the prerendered HTML so hydration does not perform an unnecessary second request.
- This mechanism is intended for public values; real secrets should remain in the backend or infrastructure layer, never in the frontend.

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

- Unit and integration tests for routing, runtime config, bootstrap, contact workflows, repository behavior, and home-page interactions
- End-to-end Playwright coverage for bootstrap, critical navigation, and contact dialog submission
- Minimum coverage thresholds for statements, branches, functions, and lines
- `typecheck` script for Angular and template type validation
- Production build verification
- Explicit CI verification of prerendered output through `prerendered-routes.json` and key HTML routes

In addition, the CI workflow publishes an immutable `web-dist` artifact, isolated by run and reused by the deploy workflows so that development and production receive the exact same validated build. Coverage reports and Playwright evidence are retained in a separate artifact to simplify failure diagnosis.

Available scripts:

```bash
npm install
npm start
npm run build
npm test
npm run test:ci
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run typecheck
npm run e2e
npm run e2e:ci
```

## Branching Strategy and CI/CD

### Branch model

- `development` acts as the integration branch and continuous validation target.
- `main` represents the production-ready branch.
- Pull requests targeting `development` or `main` run automated validation only.
- Pushes to `development` deploy to a dedicated Firebase Hosting development site.
- Pushes or merges to `main` trigger the production delivery flow.

### Automated workflows

The repository separates responsibilities into three GitHub Actions workflows:

- `CI`
  - Audits production dependencies and runs `format:check`, `lint`, `typecheck`, tests with coverage, end-to-end tests, and `build`
  - Verifies that the build produced static SSR output ready to be reused by deploy
  - Uploads an immutable artifact associated with the validated run and retains test evidence
  - Cancels outdated runs on the same branch through `concurrency`

- `Deploy Dev`
  - Runs only after a successful `CI` execution caused by a same-repository push to `development`
  - Downloads the artifact associated with the exact validated commit
  - Deploys to the Firebase Hosting `dev` target
  - Cancels older development deployments when a newer one arrives

- `Deploy Prod`
  - Runs only after a successful `CI` execution caused by a same-repository push to `main`
  - Downloads the exact artifact produced by CI
  - Deploys to the Firebase Hosting `prod` target
  - Serializes production deployments to avoid overlapping releases

All external actions and the Firebase CLI version are pinned for reproducible runs. Dependabot checks npm and GitHub Actions dependencies weekly.

### Environments and production promotion

- GitHub Environments separates `development` and `production`.
- `production` is intended to require a manual approval step before deployment.
- `main` is designed to be promoted through pull requests and required validation checks.
- This setup keeps development delivery fast while adding a controlled gate before production.

### Firebase Hosting setup

The project uses a multi-site Firebase Hosting configuration:

- `prod` -> `mayteflowers01`
- `dev` -> `mayteflowers01-dev`

The targets are defined in `.firebaserc` and referenced from `firebase.json`.

### Operational rollback

If a production deployment needs to be reverted after publication, the recommended recovery path is:

1. identify the last stable release in Firebase Hosting history
2. restore or re-publish the previous healthy version
3. fix the issue in `development`
4. promote the fix again through a pull request to `main`

The key idea behind the pipeline is that production should publish an already-validated artifact, not a separately rebuilt version.

## Local Setup

### Requirements

- Node.js `^22.22.3` or `^24.15.0` or `^26.0.0` (`24.18.0` recommended through `.nvmrc`)
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

With the current hybrid rendering setup, the build produces:

- `index.html` as the entry redirect
- `index.csr.html` as the base CSR template
- prerendered HTML per route, for example `dist/mayte-flowres/home/index.html`
- `prerendered-routes.json` with the generated route manifest
