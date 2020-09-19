module.exports = app => {

  // Base URLS
  app.use('/', require('./index.routes'))
  app.use('/', require('./auth.routes'))
  app.use('/sarao', require('./sarao.routes'))
  app.use('/event', require('./event.routes'))
  app.use('/user', require('./user.routes'))
  app.use('/api', require('./api.routes'))
}
