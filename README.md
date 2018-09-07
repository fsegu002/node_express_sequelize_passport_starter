#### Add an .env file with:
* SECRET
* DEV_DATABASE_URL
* TEST_DATABASE_URL
* PROD_DATABASE_URL


#### Execute migration command 'node_modules/.bin/sequelize db:migrate' before starting the server
Sequelize reference: [http://docs.sequelizejs.com/manual/tutorial/migrations.html](http://docs.sequelizejs.com/manual/tutorial/migrations.html)

#### Running Test
To run the tests using Mocha and Chai run the following:

```
npm run test
```