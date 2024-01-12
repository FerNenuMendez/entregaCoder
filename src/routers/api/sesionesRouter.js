import { Router } from 'express'
import { deleteControllerSesion, getControllerSesion } from '../../controllers/sesionesController.js'
import { UsuarioManager } from '../../mongodb/mongodb.js'

export const sesionesRouter = Router()

sesionesRouter.post('/',
    async (req, res, next) => {
        const { email, password } = req.body
        try {
            const datosUsuario = await UsuarioManager.login(email, password)
            req.session['user'] = datosUsuario
            next()
        } catch (error) {
            next(error)
        }
    },
    async (req, res, next) => {
        res.status(201).json({ status: 'success', message: 'login success' })
    },
    (error, req, res, next) => {
        res.status(401).json({ status: 'error', message: error.message })
    }
)
sesionesRouter.get('/current', getControllerSesion)
sesionesRouter.delete('/current', deleteControllerSesion)
