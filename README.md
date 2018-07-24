## Add a config.json file to configure DB
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

## Add an .env file with a SECRET key

## Execute migration command 'node_modules/.bin/sequelize db:migrate' before starting the server
