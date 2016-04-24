/**
 * Mail configuration
 */

'use strict'

const nodemailer = require('nodemailer')
const mg         = require('nodemailer-mailgun-transport')

const API_KEY = 'key-5c1fc3a3b8cd274540898f16a1e062af'
const domain  = 'sandbox4473c9277ff3462fa2fadd575a7ea138.mailgun.org'

const auth = {
  auth: {
    api_key: API_KEY,
    domain: domain,
  }
}

module.exports = nodemailer.createTransport(mg(auth))
