import { Router } from 'express'
import { deleteControllerSesion, getControllerSesion } from '../../controllers/sesionesController.js'
import passport from 'passport'

export const sesionesRouter = Router()

sesionesRouter.post('/',
    passport.authenticate('loginLocal', {
        failWithError: true,
        successRedirect: '/api/usuarios/profile',
        failureRedirect: '/api/usuarios/login'

    }),

)
sesionesRouter.get('/current', getControllerSesion)
sesionesRouter.delete('/current', deleteControllerSesion)
