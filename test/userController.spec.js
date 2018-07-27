process.env.NODE_ENV = 'test'

const models = require('../models/index')

let chai = require('chai')
let chaiHttp = require('chai-http')
let expect = chai.expect
let app = require('../bin/www')
let seed = require('./seed')

chai.use(chaiHttp)

describe('userController API', () => {
  let authToken = ''

  // start with a fresh DB 
  before(done => {
    models.sequelize.sync({ force: true })
    .then(() => {
      return seed(models)
    }).then(() => {
      return chai.request(app)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .post('/signup')
      .send({
        email: 'test@company.com',
        password: 'pass123456'
      })
    }).then(() => {
      return chai.request(app)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .post('/signin')
      .send({
        email: 'test@company.com',
        password: 'pass123456'
      })
      .then((res) => {
        authToken = res.body.token
      })
    }).then(() => {
      done()
    })
  })

  // describe('GET /user', () => {
  //   it('should return a list of users', () => {
  //     return chai.request(app)
  //     .set('Authorization', 'Bearer ' + authToken)
  //     .get('/user')
  //     .then((res) => {
  //       expect(res.status).to.equal(200)
  //     })
  //   })
  // })

})