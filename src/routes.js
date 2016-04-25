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
        method: 'POST',
        path: '/loginAlpha',
        handler: handler.loginAlpha
    },
    {
        method: 'POST',
        path: '/loginColor',
        handler: handler.loginColor
    },
    {
        method: 'POST',
        path: '/getDirs',
        handler: handler.getDirs
    },
    {
        method: 'GET',
        path: '/{p*}',
        handler: handler.static
    },
]
