/**
 * Provides top level configuration for the database.
 */

'use strict';

const knex = require('knex')
const bookshelf = require('bookshelf')

const config = {

  client: 'mysql',

  connection: {

    host:     'localhost',
    database: 'authenticate',

    user:     'root',
    password: '',

  },

  debug: true,

};

module.exports = bookshelf(knex(config))
