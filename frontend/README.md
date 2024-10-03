# Inprocode Project

## Descripció

Aquest projecte és una aplicació web desenvolupada amb Angular 18 que permet gestionar productes, visualitzar ubicacions en un mapa, interactuar amb un calendari per afegir i eliminar esdeveniments i mostrar dades en gràfics.

### Característiques

- **Gestió de Productes**: Afegir, editar, i eliminar productes d'un llistat.
- **Mapa Interactiu**: Mostra ubicacions en un mapa interactiu de Mapbox, permetent afegir noves ubicacions fent clic al mapa.
- **Calendari**: Utilitza FullCalendar per afegir i eliminar esdeveniments dins d'un calendari interactiu.
- **Gràfics**: Visualitza les dades de les ubicacions mitjançant gràfics de barres i línies generats amb Chart.js.

## Tecnologies Utilitzades

- **TypeScript**
- **HTML5**
- **SCSS**
- **[Angular](https://angular.dev/installation)** CLI version 18.1.2
- **Mapbox** per a la visualització de mapes
- **FullCalendar** per a la gestió de calendaris
- **Chart.js** per a la creació de gràfics

## Requisits

- **Node.js** i **npm** instal·lats al teu sistema. Pots trobar-los a [nodejs.org](https://nodejs.org/en).
- **Angular CLI** instal·lat globalment. Pots instal·lar-lo amb el següent codi:

  ```bash
  npm install -g @angular/cli
  ```

## Instal.lació

## Backend (servidor Node.js)

- **Clona el repositori**

  ```bash
  git clone https://github.com/akustikoa/sprint8.git

  ```

- **Entra al directori del projecte**

  ```bash
  cd inprocode/backend

  ```

- **Instal.la les dependències del backend**

  ```bash
  npm install

  ```

- **En el teu mySQLadmin crea una base da dades "almacen"**

  ```bash
  importa l'arxiu almacen.sql

  ```

- **Compila i arrenca el servidor**
  **A la primera terminal**

  ```bash
  nodemon dist/index.js
  ```

  **A la segona terminal**

  ```bash
  tsc --watch
  ```

## Frontend (aplicació Angular)

- **Entra al directori del frontend**

  ```bash
  cd ../frontend
  ```

- **Instal.la les dependències del frontend**

  ```bash
  npm install
  ```

- **Arrenca l'aplicació Angular**

  ```bash
  ng serve -o
  ```
