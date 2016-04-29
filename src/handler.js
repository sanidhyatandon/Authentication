/**
 * User handler
 */

'use strict'

const fs   = require('fs')
const Path = require('path')
const _    = require('lodash')

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

const GridPassword  = require('./service').GridPassword

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
    registerColor(request, reply) {
        const user = new User({
            firstName: request.payload.fname,
            lastName:  request.payload.lname,
            email:     request.payload.email,
            red:       request.payload.red,
            pink:      request.payload.pink,
            orange:    request.payload.orange,
            yellow:    request.payload.yellow,
            scheme:    'color',
        })
        new UserEntity(deleteNullKeys(user))
            .save()
            .then(user => user.toJSON())
            .then(reply.file(staticFile('index.html')))
            .catch(console.log)
    },
    loginAlpha(request, reply) {
        const email      = request.payload.email
        const gridStr    = request.payload.pswdGridN
        const pswdFromUI = request.payload.pswdProvided.toUpperCase()

        new UserEntity()
            .query( { where: { email: email } } )
            .fetch( { require: true } )
            .then( user => user.toJSON() )
            .then( user => {

                const password = GridPassword(gridStr, user.password)

                if (password === pswdFromUI) {
                    if (user.userType === 'ADMIN') {
                        reply.redirect('/listUsers')
                    } else {
                        reply.file(staticFile('explorer.html'))
                    }
                } else {
                    reply.file(staticFile('grid.html'))
                }
            })
            .catch( err => console.log(`Error`, err) )
    },
    loginColor(request, reply) {
        const email      = request.payload.email
        const gridStr    = request.payload.pswdGridN
        const pswdFromUI = request.payload.pswdProvided.toUpperCase()
        const colorGrid  = request.payload.randomColorSeq.split(' ')

        new UserEntity()
            .query( { where: { email: email } } )
            .fetch( { require: true } )
            .then( user => user.toJSON() )
            .then( user => {

                const pswd = colorGrid.reduce((pswd, color) => pswd + user[color], '')

                let deriveStr = ''
                for (let j =  0 ; j < pswd.length; j += 2) {
                    const firstChar =  parseInt(pswd[j])
                    const secChar   =  parseInt(pswd[j+1])
                    const index     =  (firstChar - 1) * 4 + secChar - 1
                    deriveStr      +=  gridStr[index]
                }

                if (password === pswdFromUI) {
                    if (user.userType === 'ADMIN') {
                        reply.redirect('/listUsers')
                    } else {
                        reply.file(staticFile('explorer.html'))
                    }
                } else {
                    reply.file(staticFile('colorgrid.html'))
                }

                console.log({
                    user: user,
                    gridStr: gridStr,
                    pswdFromUI: pswdFromUI,
                    colorGrid: colorGrid,
                    pswd: pswd,
                    deriveStr: deriveStr,
                    chunk: _.chunk(gridStr, 5)
                })

            })
            .catch( err => console.log(`Error`, err) )
    },
    getDirs(request, reply) {
        const dir = request.payload.dir;
        let r = '<ul class="jqueryFileTree" style="display: none;">';
        try {
            r = '<ul class="jqueryFileTree" style="display: none;">';
            const files = fs.readdirSync(dir);
            files.forEach(function(f){
                const ff = Path.join(dir, f);
                const stats = fs.statSync(ff)
                if (stats.isDirectory()) {
                    r += '<li class="directory collapsed"><a href="#" rel="' + ff  + '/">' + f + '</a></li>';
                } else {
                    const e = f.split('.')[1];
                    r += '<li class="file ext_' + e + '"><a href="#" rel='+ ff + '>' + f + '</a></li>';
                }
            });
            r += '</ul>';
        } catch(e) {
            console.log(e)
            r += 'Could not load directory: ' + dir;
            r += '</ul>';
        }
        reply(r)
    },
    listUsers(request, reply) {
        UserEntity.collection()
            .fetch()
            .then(data => data.toJSON())
            .then(users => reply.view('listUsers', { userId: 12, users: users }))
    },
    activate(request, reply) {
        const id = request.query.id
        new UserEntity({ id: id })
            .save({status: 'ACTIVATED'}, {patch: true})
            .then(() => reply.redirect('/listUsers'))
    }
}
