**⚠️ DripDash is still a work in progress, check back for updates.**

![DripDash Header](public/drip-dash-header.svg)

DripDash is an all-in-one aquaponics monitoring, control and data logging tool,
built with Vue on Node.js.

DripDash is constructed in three parts:
- The frontend, constructed with Vue.js for control and monitoring.
- The backend, integrating express, the database and API.
- The collector, which can run _within_ the backend, or standalone, to prevent
opening your aquaponics hardware to the internet.


## Installation
1. To install DripDash, clone the repository.  
GitLab: `git clone https://gitlab.com/Onfe/drip-dash.git`  
GitHub: `git clone https://github.com/onfe/drip-dash.git`  

2. Open the folder `cd drip-dash`, then install the required dependencies using
`npm install`.

3. Set your database configuration in `src/server/config/sequelize-config.json`.  
We recommend [PostgreSQL](https://www.postgresql.org) or
[MariaDB](https://mariadb.org/).  

4. Prepare the Database with `npm run prepdb`.

5. Finally, build DripDash with `npm run build`.

### Updating
To update DripDash run `git pull`.
Then complete steps 4 and 5 of the installation.

## Running DripDash
- To run DripDash, use `npm run production`.
- To run DripDash with the *internal* data collector, use
`npm run production -- --collector=internal`
- To run the *external* data collector, ensure the **internal collector is not
enabled** then use `npm run collector`

## Development
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
Running the production build: `node src/server/index.js`.  
An external collector is assumed by default.

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
