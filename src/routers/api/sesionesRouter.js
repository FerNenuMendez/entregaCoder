import { Router } from 'express'
import { postControllerSesion, deleteControllerSesion, getControllerSesion } from '../../controllers/sesionesController.js'

export const sesionesRouter = Router()

sesionesRouter.post('/', postControllerSesion)
sesionesRouter.get('/current', getControllerSesion)
sesionesRouter.delete('/current', deleteControllerSesion)
