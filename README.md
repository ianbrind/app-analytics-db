# app-analytics-db
The Node, Express, Mongo (Mongoose ORM) Analtics Database. 

<!-- [![Build Status](https://travis-ci.org/fendorio/femgoose.svg?branch=master)](https://travis-ci.org/fendorio/femgoose)
[![Generic badge](https://img.shields.io/badge/status-alpha-red.svg)](https://shields.io/)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![Generic badge](https://img.shields.io/badge/badges-awesome-ff69b4.svg)](https://shields.io/) -->


## Installation

To install the application, firstly you'll want to install the project's dependancies using either yarn or npm.

`yarn install`


#### Development
To start the application in development, use one of the following commands

This assumes you have setup a config.development.js file in /config.

**Using Node**

```sh
NODE_ENV=development node src/server.js 
```

Or shorthand...

```sh
yarn unix-dev
```

**Using Nodemon**

```sh
NODE_ENV=development nodemon src/server.js 
```

Or shorthand...

```sh
yarn unix-dev-nodemon
```

### Configuration

Provided is an example configuration file.

`config/config.NODE_ENV.js`

That's right, you guessed it! Once you're done editing the ready made configuration file, rename it, replaceing `NODE_ENV` with the name of your environment, common examples would be **development**, **staging** or **production**.
