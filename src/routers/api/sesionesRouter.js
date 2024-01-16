import passport from 'passport'
import { Router } from 'express'
import { deleteControllerSesion } from '../../controllers/sesionesController.js'
import { onlyLogueadosRest } from '../../middlewares/autorizaciones.js'


export const sesionesRouter = Router()

sesionesRouter.post('/',
    passport.authenticate('loginLocal', {
        failWithError: true,
        successRedirect: '/api/usuarios/profile',
        failureRedirect: '/api/usuarios/login'

    }),
    async (req, res, next) => {
        res.status(201).json({ status: 'success', message: 'login success' })
    },
    (error, req, res, next) => {
        res.status(401).json({ status: 'error', message: error.message })
    }
)
sesionesRouter.get('/current', onlyLogueadosRest, (req, res) => {
    res.json(req.user)
})
sesionesRouter.delete('/current', deleteControllerSesion)
