# Mayte Flowers

[![Idioma: Espanol](https://img.shields.io/badge/Idioma-Espa%C3%B1ol-0a66c2)](./README.md)
[![Language: English](https://img.shields.io/badge/Language-English-2ea44f)](./README.en.md)

Catalogo de productos y sitio web comercial en Angular 22, construido para una marca exportadora de flores.

Este repositorio muestra como se abordo una aplicacion Angular real mas alla de la interfaz: Arquitectura, enrutamiento, SEO, accesibilidad, formularios tipados, analitica, carga orientada al rendimiento y limites de features mantenibles.

## Descripción del Proyecto

Esto no es una demo de una sola pagina con tarjetas estaticas. Es una aplicacion frontend estructurada para reflejar el tipo de trabajo esperado en un equipo Angular profesional:

- Arquitectura Angular standalone con rutas lazy-loaded
- Organizacion por features con APIs publicas
- Composicion reutilizable de UI en lugar de componentes gigantes por pagina
- SEO consciente de rutas con canonical tags y datos estructurados
- Flujos de contacto accesibles con validacion tipada
- Abstraccion de analitica para page views y eventos de negocio
- Carga resiliente del catalogo y estados de error explicitos
- Mejoras de type safety como `noUncheckedIndexedAccess`

## Alcance Del Producto

La aplicacion incluye:

- Home con branding, carrusel personalizado y CTAs
- Pagina about enfocada en confianza, contexto comercial e informacion para compradores
- Landing de catalogo con categorias de flores
- Paginas de detalle por categoria
- Paginas de detalle por producto con especificaciones comerciales
- Dialogo de contacto accesible para captacion de leads
- Metadata SEO y datos estructurados para visibilidad organica

Este proyecto fue orientado intencionalmente para mostrar habilidades frontend practicas que transfieren bien a entornos productivos:

- Traducir contenido de negocio a una aplicacion Angular mantenible
- Separar responsabilidades entre `core`, `features` y `shared`
- Mantener contratos publicos explicitos mediante barrels locales
- Combinar Angular Signals, RxJS y route resolvers de forma limpia
- Usar Bootstrap como base de layout sin perder identidad visual
- Mejorar UX con view transitions, lazy loading y tipado mas seguro

## Stack Tecnologico

- Angular 22
- TypeScript 6
- Angular CDK
- Bootstrap 5
- RxJS 7
- Karma + Jasmine para pruebas unitarias
- Playwright para pruebas end-to-end
- GitHub Actions para CI/CD
- Firebase Hosting para despliegues multi-sitio

## Puntos Fuertes De Ingenieria

### Arquitectura

- `core` contiene preocupaciones transversales como analitica, configuracion, layout y SEO.
- `features` concentra dominios de negocio como `home`, `about`, `catalogue` y `contact`.
- `shared` contiene piezas de UI reutilizables y presentacionales.
- El feature de contacto expone una API publica pequena mediante `features/contact/index.ts`, lo que desacopla a los consumidores de la estructura interna.

### Routing Y Estrategia De Carga

- Las paginas principales se cargan de forma lazy con componentes standalone de Angular.
- Las paginas del catalogo usan route resolvers para preparar datos antes del render.
- El dialogo de contacto se carga bajo demanda para reducir el bundle inicial.
- Las view transitions estan habilitadas para una navegacion mas agradable.

### SEO Y Descubribilidad

- Titulos y descripciones por ruta
- Gestion de canonical URLs
- Soporte para metadata Open Graph y Twitter
- Datos estructurados JSON-LD para organization, website, webpage, product, collection y breadcrumb schema

### Accesibilidad

- Estructura semantica por secciones y labels ARIA
- Navbar y controles del carrusel accesibles
- Comportamiento accesible del modal
- Feedback de validacion conectado con `aria-describedby` y `aria-invalid`

### Datos Y Estado

- Configuracion tipada mediante un token global de app
- Carga del catalogo desde JSON a traves de una capa repository
- Estado explicito de error de carga en lugar de fallar silenciosamente
- Uso de Signals donde el estado local de UI lo hace conveniente

### Analitica

- Servicio centralizado de analitica
- Seguimiento automatico de page views en cambios de ruta
- Eventos personalizados para CTAs, apertura de modal, acciones de WhatsApp y estados de envio de leads

### Configuracion Runtime

- La aplicacion carga configuracion publica desde `src/assets/config/`.
- En `localhost` consume `app-config.local.json`; fuera del entorno local consume `app-config.json`.
- Valores como `siteUrl`, `gaMeasurementId`, datos de contacto, branding base y enlaces externos pueden cambiarse sin recompilar el bundle.
- La configuracion se resuelve durante el arranque en `src/main.ts` y se inyecta en la aplicacion mediante `APP_CONFIG`.
- Este mecanismo esta pensado para valores publicos; los secretos reales deben permanecer en backend o infraestructura, nunca en el frontend.

## Estructura Del Proyecto

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

## Verificaciones De Calidad

El proyecto incluye:

- Pruebas unitarias e integracion para routing, runtime config, bootstrap, flujos de contacto, comportamiento del repository e interacciones de la home
- Pruebas end-to-end con Playwright para bootstrap, navegacion critica y envio del modal de contacto
- Umbrales minimos de cobertura para statements, branches, functions y lines
- Script `typecheck` para validar tipos de Angular y templates
- Verificacion de build de produccion

Ademas, el workflow de CI genera un artifact inmutable llamado `web-dist`, aislado por run y reutilizado por los workflows de despliegue para publicar exactamente el mismo build que ya fue validado. Los reportes de cobertura y las evidencias de Playwright se conservan en un artifact separado para facilitar el diagnostico de fallos.

Scripts disponibles:

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

## Flujo De Ramas Y CI/CD

### Estrategia de ramas

- `development` funciona como rama de integracion y validacion continua.
- `main` representa la version promovida a produccion.
- Los Pull Requests hacia `development` o `main` ejecutan validaciones automáticas, pero no despliegan.
- Los pushes a `development` despliegan a un sitio de desarrollo en Firebase Hosting.
- Los pushes o merges a `main` disparan el flujo de produccion.

### Workflows automatizados

El repositorio separa responsabilidades en tres workflows de GitHub Actions:

- `CI`
  - Audita dependencias de produccion y ejecuta `format:check`, `lint`, `typecheck`, pruebas con cobertura, pruebas end-to-end y `build`
  - Publica un artifact inmutable asociado al run validado y conserva evidencias de pruebas
  - Cancela ejecuciones viejas de la misma rama mediante `concurrency`

- `Deploy Dev`
  - Se dispara solo cuando `CI` termina correctamente tras un push del mismo repositorio a `development`
  - Descarga el artifact asociado al commit exacto del run validado
  - Despliega al target `dev` de Firebase Hosting
  - Cancela despliegues viejos si llega uno mas reciente

- `Deploy Prod`
  - Se dispara solo cuando `CI` termina correctamente tras un push del mismo repositorio a `main`
  - Descarga el mismo artifact validado por CI
  - Despliega al target `prod` de Firebase Hosting
  - Serializa despliegues de produccion para evitar que se pisen entre si

Todas las acciones externas y la version de Firebase CLI estan fijadas para que las ejecuciones sean reproducibles. Dependabot revisa semanalmente las dependencias npm y GitHub Actions.

### Environments y promocion a produccion

- GitHub Environments separa `development` y `production`.
- `production` esta pensado para requerir aprobacion manual antes del despliegue.
- La rama `main` se trabaja mediante Pull Request y validaciones requeridas antes del merge.
- Este modelo permite validar en desarrollo antes de promover a produccion.

### Firebase Hosting

El proyecto usa configuracion multi-sitio:

- `prod` -> `mayteflowers01`
- `dev` -> `mayteflowers01-dev`

Los targets estan definidos en `.firebaserc` y resueltos desde `firebase.json`.

### Rollback operativo

Si un despliegue de produccion falla funcionalmente despues de publicarse, la forma recomendada de recuperacion es:

1. identificar la ultima version estable en el historial de Firebase Hosting
2. restaurar o republicar la version anterior estable
3. corregir el problema en `development`
4. volver a promover a `main` mediante Pull Request

La idea principal del pipeline es que produccion siempre publique un artifact ya validado, no un build recompilado aparte.

## Setup Local

### Requisitos

- Node.js `^22.22.3` o `^24.15.0` o `^26.0.0` (`24.18.0` recomendado mediante `.nvmrc`)
- npm 11+

### Ejecutar En Local

```bash
npm install
npm start
```

Luego abre `http://localhost:4200/`.

### Build De Produccion

```bash
npm run build
```

La salida de produccion se genera en `dist/mayte-flowres`.
