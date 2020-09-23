const favicon = require('serve-favicon')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

module.exports = app => {
    app.use(hbs.registerPartials(path.join(__dirname, "views", "partials")))
}