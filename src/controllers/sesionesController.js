import { UsuarioManager } from '../mongodb/mongodb.js'
import { ADMIN_EMAIL } from '../utils/config.js'
import { hasheadasSonIguales } from '../utils/criptografia.js'

export async function getControllerSesion(req, res) {
    if (req.session['user']) {
        return res.json(req.session['user'])
    }
    res.status(400).json({ status: 'error', message: 'no hay una sesion iniciada' })
}

export async function postControllerSesion(req, res) {
    const { email, password } = req.body
    try {

        const datosUsuario = await UsuarioManager.login(email, password)
        req.session['user'] = datosUsuario
        res.status(201).json({ status: 'success', message: 'login success' })
    } catch (error) {
        return res.status(401).json({ status: 'error', message: error.message })
    }
}

export async function deleteControllerSesion(req, res) {
    req.session.destroy(err => {
        res.status(204).json({ status: 'success' })
    })
}