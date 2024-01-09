import { Router } from 'express'

import { postControllerUser, getControllerUser, putControllerUser } from '../../controllers/usuariosController.js'

export const usuariosRouter = Router()

usuariosRouter.get('/current', getControllerUser)
usuariosRouter.post('/register/', postControllerUser)
usuariosRouter.put('/register/', putControllerUser)