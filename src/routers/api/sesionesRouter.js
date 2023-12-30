import { Router } from 'express'
import { postControllerSesion, deleteControllerSesion } from '../../controllers/sesionesController.js'

export const sesionesRouter = Router()

sesionesRouter.post('/', postControllerSesion)
sesionesRouter.delete('/current', deleteControllerSesion)
