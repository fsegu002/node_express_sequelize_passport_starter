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
  before(() => {
    return models.sequelize.sync({ force: true })
    .then(() => {
      return chai.request(app)
      .post('/signup')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'test@company.com',
        password: 'pass123456'
      })
    }).then(() => {
      return chai.request(app)
      .post('/signin')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'test@company.com',
        password: 'pass123456'
      })
      .then((res) => {
        authToken = res.body.token
      })
    })
  })

  describe('GET /user', () => {
    it('should return a list of users', () => {
      return chai.request(app)
      .get('/user')
      .set('Authorization', 'Bearer ' + authToken)
      .then((res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.lengthOf(1)
      })
    })

    it('should return user with the ID of 1 from seed', () => {
      return chai.request(app)
      .get('/user/1')
      .set('Authorization', 'Bearer ' + authToken)
      .then((res) => {
        expect(res.status).to.equal(200)
        expect(res.body.email).to.equal('test@company.com')
      })
    })

    it('should edit users First name', () => {
      return chai.request(app)
      .put('/user/1')
      .set({
        'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
      .send({
        firstName: 'Jake'
      })
      .then((res) => {
        expect(res.status).to.equal(200)
        expect(res.body.firstName).to.equal('Jake')
      })
    })

    it('should delete user', () => {
      return chai.request(app)
      .delete('/user/1')
      .set({
        'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
      .then((res) => {
        expect(res.status).to.equal(200)
      })
    })
  })

})