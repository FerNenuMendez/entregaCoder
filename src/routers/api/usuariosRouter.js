import { Router } from 'express'
import { UsuarioManager } from '../../mongodb/mongodb.js'

export const usuariosRouter = Router()

usuariosRouter.post('/api/register', async (req, res) => {
    try {
        const usuario = await UsuarioManager.create(req.body)
        res.status(201).json({
            status: 'success',
            payload: usuario.toObject()
        })
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message })
    }
})