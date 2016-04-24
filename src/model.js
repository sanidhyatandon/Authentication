/**
 * Models
 */

'use strict';

const db = require('../config/db')

exports.UserEntity = class UserEntity extends db.Model {
    get tableName() {
       return 'users';
    }
}

exports.User = class User {
    constructor(options) {
        this.firstName  = options.firstName
        this.lastName   = options.lastName
        this.email      = options.email
        this.password   = options.password
        this.scheme     = options.scheme
        this.red        = options.red
        this.pink       = options.pink
        this.orange     = options.orange
        this.yellow     = options.yellow
        this.status     = options.status
    }
}
