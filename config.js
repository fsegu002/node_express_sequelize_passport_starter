// const sequelize = new Sequelize('postgres://favLinks-user:1234@localhost:5432/favLinks-dev')
const database = process.env.DATABASE_NAME
const username = process.env.DATABASE_USERNAME
const password = process.env.DATABASE_PASSWORD

const Sequelize = require('sequelize')
const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = sequelize