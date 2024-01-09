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

    let datosUsuario

    if (email === ADMIN_EMAIL && password === 'adminCod3r123') {
        datosUsuario = {
            email: 'admin',
            nombre: 'admin',
            apellido: 'admin',
            rol: 'admin'
        }
    } else {
        const usuario = await UsuarioManager.findOne({ email }).lean()

        if (!usuario) {
            return res.status(400).json({ status: 'error', message: 'Usuario no encontrado' })
        }

        if (!hasheadasSonIguales(password, usuario.password)) {
            return res.status(400).json({ status: 'error', message: 'Password incorrecta' })
        }

        datosUsuario = {
            email: usuario.email,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            rol: 'usuario'
        }
    }

    req.session['user'] = datosUsuario
    res.status(201).json({ status: 'success', message: 'login success' })
}

export async function deleteControllerSesion(req, res) {
    req.session.destroy(err => {
        res.status(204).json({ status: 'success' })
    })
}