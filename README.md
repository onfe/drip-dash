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
These installations assume you have `nodejs` (& therefore `npm`) and `git` installed.
```bash
sudo apt-get install nodejs git
```

DripDash uses Node 13.

1. To install DripDash, clone the repository.  
  GitLab: `git clone https://gitlab.com/Onfe/drip-dash.git`  
  GitHub: `git clone https://github.com/onfe/drip-dash.git`  
2. Open the folder `cd drip-dash`, then install the required dependencies using
  `npm install`.
3. `cp .env.example .env` and add your database credentials.
  We recommend [PostgreSQL](https://www.postgresql.org) or
  [MariaDB](https://mariadb.org/).  
4. Set the environment variable `NODE_ENV` to `production`.
5. Prepare the Database with `npm run prepdb`.
6. Finally, build DripDash with `npm run build`.

### Updating
To update DripDash run `git pull`.
Then complete steps 4 and 5 of the installation.

### Database installation

If running your database on the same server as dripdash, check out the instructions [here](docs/PostgreSQL%20Setup.md).

## Running DripDash
- To run DripDash, use `npm run production`.
- To run DripDash with the *internal* data collector, use
`npm run production -- --collector=internal`
- To run the *external* data collector, ensure the **internal collector is not
enabled** then use `npm run collector`

### Backup
The easiest way to backup DripDash completely is to dump the database. The following instructions are for PostgreSQL.
```bash
# Dump the 'dripdash' database to dripdash.bak
sudo -u postgres pg_dump dripdash > dripdash.bak

# Restore from a .bak (into an existing, but empty database)
sudo -u postgres psql dripdash_restored < database.bak
```
### HTTPS
DripDash (and the external collector if enabled) use HTTP by default.  
To use HTTPS, we recommend using NGINX or Apache as a HTTPS proxy, and Let's Encrypt as the CA.

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
