import passport from 'passport'
import { Router } from 'express'
import { onlyLogueadosRest } from '../../middlewares/autorizaciones.js'
import { deleteControllerSesion } from '../../controllers/sesionesController.js'

export const sesionesRouter = Router()

sesionesRouter.post('/',
    passport.authenticate('loginLocal', {
        failWithError: true
    }),
    async (req, res, next) => {
        res.status(201).json({ status: 'success', message: 'login success' })
    },
    (error, req, res, next) => {
        res.status(401).json({ status: 'error', message: error.message })
    })

sesionesRouter.get('/current', onlyLogueadosRest, (req, res) => {
    res.json(req.user)
})
sesionesRouter.delete('/current', deleteControllerSesion)
