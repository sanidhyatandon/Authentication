const Hapi   = require('hapi')
const Inert  = require('inert')
const Vision = require('vision')
const Path   = require('path')
const routes = require('./routes')
const Handlebars = require('handlebars')

const server = new Hapi.Server()

server.connection({
	port: '8000'
})

server.register([Inert, Vision])
    .then(() => {
        server.views({
          engines: { html: Handlebars },
          path: Path.join(__dirname, '..', 'public')
        })
    })
    .then(() => server.route(routes))
    .then(() => server.start())
	.then(console.log(`Server running on ${server.info.uri}`))
	.catch(console.log)
