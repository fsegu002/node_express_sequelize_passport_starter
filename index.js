const express = require('express')
const app = express()
const routes = require('./router')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')


const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('dev'))
require('dotenv').config()

app.use('/', routes)

app.listen(port, () => console.log(`Listening on port ${port}`))
