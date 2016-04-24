const Hapi  = require('hapi')
const Inert = require('inert')
const Path  = require('path')

const server = new Hapi.Server()

server.connection({
	port: '8000'
})

server.register(Inert)

server.route({
	method: '*',
	path: '/login',
	handler: (request, reply) => {
		reply.file(Path.join(__dirname, 'public', 'register.html'))
	}
})

server.route({
	method: '*',
	path: '/registerProcess',
	handler: (request, reply) => {
		reply.file(Path.join(__dirname, 'public', 'registerProcess.html'))
	}
})

server.route({
	method: 'GET',
	path: '/{p*}',
	handler: {
		directory: {
			path: Path.join(__dirname, 'public')
		}
	}
})

server.start()
	.then(() => console.log(`Server running on ${server.info.uri}`))
	.catch(console.log)