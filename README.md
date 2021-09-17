# Bank Application

## Description

Bank application

## Installation

```bash
$ npm install
```

## Application Setup

The application is configured in the .env file 

Enviroment variable *API* responsible for the API

Set variable *API* in **cli** if you want to use the application via console

```
API=cli
```

Set variable *API* in **rest** if you want to use the application via REST

```
API=rest
```


Enviroment variable *DB* responsible for the API

Set variable *DB* in **json** if you want to use the application  together with json

```
DB=json
```

Set variable *DB* in **rest** if you want to use the application  together with PostgreSQL. For PostgreSQL to work, either a locally enabled PostgreSQL server is required, or by running docker-compose

```
DB=sql
```

```bash
$ docker-compose up
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

