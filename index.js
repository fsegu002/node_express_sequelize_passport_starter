require('dotenv').config()
const express = require('express')
const routes = require('./router')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const passport = require('passport')
require('./passport')

module.exports = function app() {
    const expressApp = express()
    expressApp.use(bodyParser.json())
    expressApp.use(bodyParser.urlencoded({ extended: true }))
    expressApp.use(helmet())
    expressApp.use(morgan('dev'))
    
    expressApp.use('/', routes)

    return expressApp
}
