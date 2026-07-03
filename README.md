# Mayte Flowers

[![Idioma: Espanol](https://img.shields.io/badge/Idioma-Espa%C3%B1ol-0a66c2)](./README.md)
[![Language: English](https://img.shields.io/badge/Language-English-2ea44f)](./README.en.md)

Catalogo de productos y sitio web comercial en Angular 22, construido como proyecto de portafolio frontend para una marca exportadora de flores.

Este repositorio muestra como abordo una aplicacion Angular real mas alla de la interfaz: arquitectura, enrutamiento, SEO, accesibilidad, formularios tipados, analitica, carga orientada al rendimiento y limites de features mantenibles.

## Por Que Importa Este Proyecto

Esto no es una demo de una sola pagina con tarjetas estaticas. Es una aplicacion frontend estructurada para reflejar el tipo de trabajo esperado en un equipo Angular profesional:

- arquitectura Angular standalone con rutas lazy-loaded
- organizacion por features con APIs publicas
- composicion reutilizable de UI en lugar de componentes gigantes por pagina
- SEO consciente de rutas con canonical tags y datos estructurados
- flujos de contacto accesibles con validacion tipada
- abstraccion de analitica para page views y eventos de negocio
- carga resiliente del catalogo y estados de error explicitos
- mejoras de type safety como `noUncheckedIndexedAccess`

Si estas revisando este repositorio como reclutador o hiring manager, la principal senal no es solo el resultado visual, sino las decisiones de ingenieria detras del proyecto.

## Alcance Del Producto

La aplicacion incluye:

- una home con branding, carrusel personalizado y CTAs
- una pagina about enfocada en confianza, contexto comercial e informacion para compradores
- una landing de catalogo con categorias de flores
- paginas de detalle por categoria
- paginas de detalle por producto con especificaciones comerciales
- un dialogo de contacto accesible para captacion de leads
- metadata SEO y datos estructurados para visibilidad organica

## Lo Que Quise Demostrar

Este proyecto fue orientado intencionalmente para mostrar habilidades frontend practicas que transfieren bien a entornos productivos:

- traducir contenido de negocio a una aplicacion Angular mantenible
- separar responsabilidades entre `core`, `features` y `shared`
- mantener contratos publicos explicitos mediante barrels locales
- combinar Angular Signals, RxJS y route resolvers de forma limpia
- usar Bootstrap como base de layout sin perder identidad visual
- mejorar UX con view transitions, lazy loading y tipado mas seguro

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

- titulos y descripciones por ruta
- gestion de canonical URLs
- soporte para metadata Open Graph y Twitter
- datos estructurados JSON-LD para organization, website, webpage, product, collection y breadcrumb schema

### Accesibilidad

- estructura semantica por secciones y labels ARIA
- navbar y controles del carrusel accesibles
- comportamiento accesible del modal
- feedback de validacion conectado con `aria-describedby` y `aria-invalid`

### Datos Y Estado

- configuracion tipada mediante un token global de app
- carga del catalogo desde JSON a traves de una capa repository
- estado explicito de error de carga en lugar de fallar silenciosamente
- uso de Signals donde el estado local de UI lo hace conveniente

### Analitica

- servicio centralizado de analitica
- seguimiento automatico de page views en cambios de ruta
- eventos personalizados para CTAs, apertura de modal, acciones de WhatsApp y estados de envio de leads

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

- pruebas unitarias para routing, flujos de contacto, comportamiento del repository e interacciones de la home
- script `typecheck` para validar tipos de Angular y templates
- verificacion de build de produccion

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

## Valor Para Portafolio

Este repositorio es util en entrevistas porque da evidencia concreta de:

- decisiones de arquitectura Angular, no solo maquetacion de componentes
- preocupaciones de mantenibilidad como boundaries, reutilizacion y naming
- atencion a detalles de UX como transiciones, manejo de foco y estados de error
- ownership frontend sobre calidad, testing, SEO, accesibilidad y rendimiento

## Lo Que Mejoraria Despues

Si este proyecto evolucionara como un trabajo productivo de mayor duracion, priorizaria:

- mover configuracion de runtime a una configuracion externa por entorno
- agregar ESLint y Prettier
- agregar cobertura end-to-end para flujos criticos
- optimizar y convertir mas imagenes a formatos modernos
- conectar un `gaMeasurementId` real y un endpoint productivo para leads
- agregar CI para build, tests y validacion de tipos

## Notas

- Este proyecto usa renderizado del lado del cliente, no SSR.
- La integracion con Google Analytics esta implementada mediante un servicio dedicado, pero requiere un `gaMeasurementId` real para enviar datos en vivo.

## Contacto

Si estas revisando este repositorio para un rol frontend, me encantaria explicar las decisiones de arquitectura, los tradeoffs y las mejoras que hice en este codebase.
