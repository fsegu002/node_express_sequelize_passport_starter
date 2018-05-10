# Add a config.json file to configure DB
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

# Add a .env file with a SECRET key

# Execute migration command 'db:migrate' before starting the server
