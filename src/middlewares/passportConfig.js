import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'
import { UsuarioManager } from '../mongodb/mongodb.js'
import { github_appId, github_clientID, ss_github, githubCallback } from '../utils/config.js'

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

passport.use('loginGithub', new GithubStrategy({
    clientID: github_clientID,
    clientSecret: ss_github,
    callbackURL: githubCallback
}, async (_, __, datos, done) => {
    done(null, datos)
}))


passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()
