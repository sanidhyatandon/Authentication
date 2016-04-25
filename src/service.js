/**
 * Utility services
 */

'use strict'

const mailer = require('../config/mail')

exports.mails = {

}

/**
 * Methods from processAuth
 */

class ColRow{
    constructor(col, row) {
        this.col = col
        this.row = row
    }

    getCol() { return this.col }

    setCol(col) { this.col = col }

    getRow() { return this.row }

    setRow(row) { this.row = row }
}

exports.Util = class Util {
    getPswdCharIndexForPair(firstCharOfPair, secondCharOfPair) {
        console.log(firstCharOfPair, secondCharOfPair)
        let index = 0
        if(firstCharOfPair.getRow() === secondCharOfPair.getRow()) {
            index = (firstCharOfPair.getRow() * 6) + firstCharOfPair.getCol()
        } else if(firstCharOfPair.getCol() === secondCharOfPair.getCol()) {
            index = (firstCharOfPair.getRow() * 6) + firstCharOfPair.getCol()
        } else {
            index = (secondCharOfPair.getRow() * 6) + firstCharOfPair.getCol()
        }
        return index
    }

    getPosOfPswdChar(charOfPswd, gridStr) {
        const index = gridStr.indexOf(charOfPswd)
        const row = index / 6
        const col = index % 6
        return new ColRow(col, row)
    }
}
