process.env.NODE_ENV = 'test'

const models = require('../models/index')

let chai = require('chai')
let chaiHttp = require('chai-http')
let expect = chai.expect
let app = 'http://localhost:3000'
let seed = require('./seed')

chai.use(chaiHttp)

describe('API Routes', () => {

  // start with a fresh DB 
  // beforeEach(done => {
  //   models.sequelize.sync({ force: true, match: /node_test_db/, logging: false })
  //   .then(() => {
  //     return seed(models)
  //   }).then(() => {
  //     done()
  //   })

  // })
  
  describe('POST /signup', (done) => {
    it('should create a new user', (done) => {
      chai.request(app)
      .post('/signup')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'test@company.com',
        password: 'pass123456'
      })
      .end((err, res) => {
        if (err) console.log(err)
        expect(res.status).to.equal(201)
        expect(res.body.email).to.equal('test@company.com')
        done()
      })
    })

    it('should return an error when creating a duplicate email', (done) => {
      chai.request(app)
      .post('/signup')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'test@company.com',
        password: 'pass123456'
      })
      .send({
        email: 'test@company.com',
        password: 'pass123456'
      })
      .end((err, res) => {
        if (err) console.log(err)
        expect(res.status).to.equal(400)
        done()
      })
    })
  })
  
})