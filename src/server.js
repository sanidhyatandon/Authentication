const Hapi   = require('hapi')
const Inert  = require('inert')
const routes = require('./routes')

const server = new Hapi.Server()

server.connection({
	port: '8000'
})

server.register(Inert)

server.route(routes)

server.start()
	.then(console.log(`Server running on ${server.info.uri}`))
	.catch(console.log)
