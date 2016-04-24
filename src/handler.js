/**
 * User handler
 */

const Path = require('path')

const staticFile = fileName => Path.join(__dirname, '..', 'public', fileName)

module.exports  = {
    login(request, reply) {
            if (request.payload.submit === 'login') {
                if (request.payload.scheme === 'number') {
                    reply.file(staticFile('grid.html'))
                } else {
                    reply.file(staticFile('colorgrid.html'))
                }
            } else {
                if (request.payload.scheme === 'number') {
                    reply.file(staticFile('register.html'))
                } else {
                    reply.file(staticFile('registerColor.html'))
                }
            }
    },
    static: {
        directory: {
            path: Path.join(__dirname,  '..', 'public')
        }
    },
}
