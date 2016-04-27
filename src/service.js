/**
 * Utility services
 */

'use strict'

const mailer = require('../config/mail')
const _      = require('lodash')

exports.mails = {

}

exports.GridPassword = (gridStr, password) => {
    const grid      = _.chunk(gridStr, 6)
    const passPairs = _.chunk(password.toUpperCase(), 2)

    const z = passPairs.reduce((pass, pair) => {
        const col = parseInt(gridStr.indexOf(pair[0]) % 6, 0)
        const row = parseInt(gridStr.indexOf(pair[1]) / 6, 0)
        return pass + grid[row][col]
    }, '')
    console.log(z)
    return z
}