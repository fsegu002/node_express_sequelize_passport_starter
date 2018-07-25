process.env.NODE_ENV = 'test'

const models = require('../models/index')

let chai = require('chai')
let chaiHttp = require('chai-http')
let expect = chai.expect
let app = require('../bin/www')
let seed = require('./seed')

chai.use(chaiHttp)

describe('API Routes', () => {

  // start with a fresh DB 
  before(done => {
    models.sequelize.sync({ force: true })
    .then(() => {
      return seed(models)
    }).then(() => {
      done()
    })
  })
  
  describe('POST /signup', () => {
    it('should create a new user', () => {
      return chai.request(app)
      .post('/signup')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'test@company.com',
        password: 'pass123456'
      })
      .then((res) => {
        expect(res.status).to.equal(201)
        expect(res.body.email).to.equal('test@company.com')
      })
    })

    it('should require an email', () => {
      return chai.request(app)
      .post('/signup')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        firstName: 'Test name',
        password: 'pass123456'
      })
      .then((res) => {
        expect(res.status).to.equal(400)
      })
    })

    it('should avoid duplicate email', () => {
      return chai.request(app)
      .post('/signup')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'test@company.com',
        password: 'pass123456'
      })
      .then((res) => {
        expect(res.status).to.equal(400)
      })
    })

    it('should allow only valid email address format', () => {
      return chai.request(app)
      .post('/signup')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'testcompany',
        password: 'pass123456'
      })
      .then((res) => {
        expect(res.status).to.equal(400)
      })
    })
  })

  describe('POST /signin', () => {
    it('should return a token when credentials are good', () => {
      return chai.request(app)
      .post('/signin')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'test@company.com',
        password: 'pass123456'
      })
      .then((res) => {
        expect(res.status).to.equal(200)
        expect(res.body.token).to.not.be.empty
      })
    })
    it('should return 400 when credentials are wrong', () => {
      return chai.request(app)
      .post('/signin')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'test@company.com',
        password: 'wrongpassword'
      })
      .then((res) => {
        expect(res.status).to.equal(400)
        expect(res.body.error.message).to.equal('Incorrect email or password.')
      })
    })
  })  
})