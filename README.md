#### Add a config.json file to configure DB
```json
{
  "development": {
    "username": "username",
    "password": "password",
    "database": "db-name",
    "host": "localhost",
    "dialect": "postgres || mysql || sqlite || mssql" // Sequilize Dialects
  },
  "test": {
    "username": "username",
    "password": "password",
    "database": "db-name",
    "host": "localhost",
    "dialect": "postgres || mysql || sqlite || mssql" // Sequilize Dialects
  },
  "production": {
    "username": "username",
    "password": "password",
    "database": "db-name",
    "host": "localhost",
    "dialect": "postgres || mysql || sqlite || mssql" // Sequilize Dialects
  },
}
```

#### Add an .env file with a SECRET key

#### Execute migration command 'node_modules/.bin/sequelize db:migrate' before starting the server
Sequelize reference: [http://docs.sequelizejs.com/manual/tutorial/migrations.html](http://docs.sequelizejs.com/manual/tutorial/migrations.html)

#### Running Test
To run the tests using Mocha and Chai run the following:

```
npm run test
```