import { Router } from 'express'

import { postControllerUser } from '../../controllers/usuariosController.js'

export const usuariosRouter = Router()

usuariosRouter.post('/register/', postControllerUser)