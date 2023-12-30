import { UsuarioManager } from '../mongodb/mongodb.js'

export async function postControllerUser(req, res) {
    const { nombre, apellido, email, password } = req.body
    try {
        const usuario = await UsuarioManager.create({ nombre, apellido, email, password })
        res.sendStatus(201)
        console.log(usuario)
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message })
    }
}