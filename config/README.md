The config file exported by index.js maps to the NODE_ENV environment variable, provided when starting the application.

For example, if the application is started with

`NODE_ENV=development`

config.development.js will be loaded, likewise 

`NODE_ENV=production`

Will load config.production.js. 

If you would like to introduce a new environment into the application, simply create a new config file, using the convention above. 

Example, executed from project root:

Creating a new environment 'demo'

```sh
cp config/config.NODE_ENV.js config/config.demo.js
```
Now simply run the application 

```sh
NODE_ENV=demo node src/server.js
```
