import session from 'express-session'
import connectMongo from 'connect-mongo'
import { SS, MONGODB_STRG } from '../utils/config.js'


const store = connectMongo.create({
    mongoUrl: MONGODB_STRG,
    ttl: 60 * 60 * 24 // 1d
})
export const sesiones = session({
    store,
    secret: SS,
    resave: false,
    saveUninitialized: false
})