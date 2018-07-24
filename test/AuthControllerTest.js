process.env.NODE_ENV = 'test'

const User = require('../models').User

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = 'http://localhost:3000'
let should = chai.should()

chai.use(chaiHttp)

let testUser = {
  email: 'testUser@company.com',
  password: 'pass1234'
}

describe('Users', () => {
  // Clean database User table before test
  beforeEach((done) => {
    User.destroy({
      where: {},
      truncate: true
    })
      .then(() => done())
      .catch(err => console.error(err))
  })
  
  describe('/POST user', () => {
    it('it should POST a new test user', (done) => {
      chai.request(server)
        .post('/signup', testUser)
        .end((err, res) => {
          if (err) return console.error(err)
          res.should.have.status(201)
          done()
        })
    })
  })
})