import { Router } from 'express'
import { onlyLogueadosRest } from '../../middlewares/autorizaciones.js'
import { postControllerUser, putControllerUser } from '../../controllers/usuariosController.js'
import { UsuarioManager } from '../../mongodb/mongodb.js'

export const usuariosRouter = Router()

usuariosRouter.get('/current', onlyLogueadosRest, async (req, res) => {
    // @ts-ignore
    const usuario = await UsuarioManager.findOne({ email: req['user'].email }, { password: 0 }).lean()
    res.json({ status: 'success', payload: usuario })
})
usuariosRouter.post('/register/', postControllerUser)
usuariosRouter.put('/register/', putControllerUser)