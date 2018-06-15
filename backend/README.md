# Truckish-FDI-Backend

> Truckish FDI Backend

## Install and Use

```sh
# cd into project root
$ npm i
# start the api
$ npm start
```

## Folder Structure

This boilerplate has 4 main directories:

- api - for controllers, models, services, etc.
- config - for routes, database, etc.
- db - this is only a dir for the sqlite db, the default for NODE_ENV development
- test - using [Jest](https://github.com/facebook/jest)

## auth.policy

The `auth.policy` checks wether a `JSON Web Token` ([further information](https://jwt.io/)) is send in the header of an request as `Authorization: Bearer [JSON Web Token]` or inside of the body of an request as `token: [JSON Web Token]`.
The policy runs default on all api routes that are are prefixed with `/private`. To map multiple routes read the [docs](https://github.com/aichbauer/express-routes-mapper/blob/master/README.md) from `express-routes-mapper`.

To use this policy on all routes of a specific prefix:

app.js

```js
app.use('/prefix', yourRoutes);
app.all('/prefix', (req, res, next) => auth(req, res, next));
```

or to use this policy on one specific route:

app.js

```js
app.get('/specificRoute',
  (req, res, next) => auth(req, res, next),
  (req, res) => {
  // do some fancy stuff
});
```

## Services

Services are little useful snippets, or calls to another API that are not the main focus of your API.

## Config

Holds all the server configurations.

## Connection and Database

This two files are the way to establish a connaction to a database.

You only need to touch connection.js, default for `development` is sqlite, but it is easy as typing `mysql` or `postgres` to switch to another db.

> Note: to run a mysql db install these package with: `yarn add mysql2` or `npm i mysql2 -S`

> Note: to run a postgres db run these package with: `yarn add pg pg-hstore` or `npm i -S pg pg-hstore`

Now simple configure the keys with your credentials.

```js
{
  database: 'databasename',
  username: 'username',
  password: 'password',
  host: 'localhost',
  dialect: 'sqlite' || 'mysql' || 'postgres',
}
```

To not configure the production code.

To start the DB, add the credentials for production. add `environment variables` by typing e.g. `export DB_USER=yourusername` before starting the api.

## Routes

Here you define all your routes for your api. It doesn't matter how you structure them. By default they are mapped on `privateRoutes` and `publicRoutes`. You can define as much routes files as you want e.g. for every model or for specific use cases, e.g. normal user and admins.

## Test

All test for this boilerplate uses [Jest](https://github.com/facebook/jest) and [supertest](https://github.com/visionmedia/superagent) for integration testing. So read their docs on further information.

### Setup

The setup directory holds the `_setup.js` which holds `beforeAction` which starts a test express application and connects to your test database, and a `afterAction` which closes the db connection.

### Controller

> Note: those request are asynchronous, we use `async await` syntax.

> Note: As we don't use import statements inside the api we also use the require syntax for tests

To test a Controller we create `fake requests` to our api routes.

### Models

Are usually automatically tested in the integration tests as the Controller uses the Models, but you can test them separatly.

## npm scripts

There are no automation tool or task runner like [grunt](https://gruntjs.com/) or [gulp](http://gulpjs.com/) used for this boilerplate. These boilerplate only uses npm scripts for automatization.

### npm start

This is the entry for a developer. This command:

By default it uses a sqlite databse, if you want to migrate the sqlite db by each start, disable the `prestart` and `poststart` command. Also mind if you are using a sqlite database to delete the `drop-sqlite-db` in the prepush hook.

- runs **nodemon watch task** for the all files conected to `.api/api.js`
- sets the **environment variable** `NODE_ENV` to `development`
- opens the db connection for `development`
- starts the server on 127.0.0.1:2017

### npm test

This command:

- runs `npm run lint` ([eslint](http://eslint.org/)) with the [airbnb styleguide](https://github.com/airbnb/javascript) without arrow-parens rule for **better readability**
- sets the **environment variable** `NODE_ENV` to `testing`
- creates the `database.sqlite` for the test
- runs `jest --coverage` for testing with [Jest](https://github.com/facebook/jest) and the coverage
- drops the `database.sqlite` after the test

### other commands

- `npm run dev` - simply start the server withou a watcher
- `npm run create-sqlite-db` - creates the sqlite database
- `npm run drop-sqlite-db` - drops **ONLY** the sqlite database
- `npm run lint` - linting with [eslint](http://eslint.org/)
- `npm run nodemon` - same as `npm start``
- `npm run prepush` - a hook wich runs before pushing to a repository, runs `npm test` and `npm run dropDB`
- `pretest` - runs linting before `npm test`
- `test-ci` - only runs tests, nothing in pretest, nothing in posttest, for better use with ci tools

## LICENSE

MIT © Truckish
