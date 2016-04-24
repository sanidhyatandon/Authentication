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
        method: 'GET',
        path: '/{p*}',
        handler: handler.static
    },
]
