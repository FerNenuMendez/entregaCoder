import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { UsuarioManager } from '../mongodb/mongodb.js'

passport.use('loginLocal', new LocalStrategy({
    usernameField: 'email'
}, async function verificationCallback(username, password, done) {
    try {
        const datosUsuario = await UsuarioManager.login(username, password)
        done(null, datosUsuario)
    } catch (error) {
        done(error)
    }
}))

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()