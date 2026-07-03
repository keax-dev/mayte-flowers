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

- Pruebas unitarias para routing, flujos de contacto, comportamiento del repository e interacciones de la home
- Script `typecheck` para validar tipos de Angular y templates
- Verificacion de build de produccion

Scripts disponibles:

```bash
npm install
npm start
npm run build
npm test
npm run typecheck
```

## Setup Local

### Requisitos

- Node.js `^22.22.3` o `^24.15.0` o `^26.0.0`
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
