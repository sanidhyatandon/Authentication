/**
 * Routes file
 */

const handler = require('./handler')

module.exports = [
    {
        method: 'POST',
        path: '/login',
        handler: handler.login
    },
    {
        method: 'POST',
        path: '/registerAlpha',
        handler: handler.registerAlpha
    },
    {
        method: 'GET',
        path: '/{p*}',
        handler: handler.static
    },
]
