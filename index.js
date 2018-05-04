require('dotenv').config()
const express = require('express')
const routes = require('./router')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const passport = require('passport')
require('./passport')

const port = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('dev'))

app.use('/', routes)

app.listen(port, () => console.log(`Listening on port ${port}`))
