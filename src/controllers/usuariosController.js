import { UsuarioManager } from '../mongodb/mongodb.js'
import { hashear } from '../utils/criptografia.js'

export async function postControllerUser(req, res) {

    try {
        req.body.password = hashear(req.body.password)
        const usuario = await UsuarioManager.create(req.body)
        res.sendStatus(201)
        console.log(usuario)
    } catch (error) {
        return res.status(400).json({ status: 'error', message: error.message })
    }
}

export async function putControllerUser(req, res) {
    try {

        // encripto password!
        req.body.password = hashear(req.body.password)

        const actualizado = await UsuarioManager.updateOne(
            { email: req.body.email },
            { $set: { password: req.body.password } },
            { new: true }
        )

        if (!actualizado) {
            return res.status(404).json({ status: 'error', message: 'usuario no encontrado' })
        }

        res.json({ status: 'success', payload: actualizado })
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message })
    }
}