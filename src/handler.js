/**
 * User handler
 */

'use strict'

const Path = require('path')

const staticFile = fileName => Path.join(__dirname, '..', 'public', fileName)
const deleteNullKeys = object => {
  Object.keys(object).forEach(key => {
    if (object[key] === null || object[key] === undefined) {
      delete object[key];
    }
  });
  return object;
};

const User          = require('./model').User
const UserEntity    = require('./model').UserEntity

const Util          = require('./service').Util

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
    registerAlpha(request, reply) {
        const user = new User({
            firstName: request.payload.fname,
            lastName:  request.payload.lname,
            email:     request.payload.email,
            password:  request.payload.password,
            scheme:    'number',
        })
        new UserEntity(deleteNullKeys(user))
            .save()
            .then(user => user.toJSON())
            .then(reply.file(staticFile('index.html')))
            .catch(console.log)
    },
    loginAlpha(request, reply) {
        const email      = request.payload.email
        const password   = request.payload.password
        const gridStr    = request.payload.pswdGridN
        const pswdFromUI = request.payload.pswdProvided.toUpperCase()

        new UserEntity()
            .query( { where: { email: email } } )
            .fetch( { require: true } )
            .then( user => user.toJSON() )
            .then( user => {
                user.password = user.password.toUpperCase()
                return user
            })
            .then( user => {
                let derivedPswd = ''
                for (let i = 0; i < user.password.length;){
                    const pair    = user.password.substring(i, i + 2);
                    const util    = new Util();
                    const colRow1 = util.getPosOfPswdChar(pair.charAt(0), gridStr)
                    const colRow2 = util.getPosOfPswdChar(pair.charAt(1), gridStr)
                    const index   = util.getPswdCharIndexForPair(colRow1, colRow2)
                    derivedPswd   = derivedPswd + gridStr.charAt(index)
                    i += 2 ;
                }
                console.log(derivedPswd, pswdFromUI)
                if (derivedPswd === pswdFromUI) {
                    if (user.userType === 'ADMIN') {
                        reply.file(staticFile('listUsers.html'))
                    } else {
                        reply.file(staticFile('explorer.html'))
                    }
                } else {
                    reply.file(staticFile('grid.html'))
                }
            })
            .catch( err => console.log(`Error`, err) )
    },
}
