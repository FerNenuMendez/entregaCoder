import { UsuarioManager } from '../mongodb/mongodb.js'
import { ADMIN_EMAIL } from '../config.js'

export async function postControllerSesion(req, res) {
    const usuario = await UsuarioManager.findOne(req.body)
    if (!usuario) {
        return res
            .status(401)
            .json({
                status: 'error',
                message: 'login failed'
            })
    }
    req.session['user'] = {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
    }
    if (usuario.email === ADMIN_EMAIL) {
        req.session['user'].rol = 'admin'
    } else {
        req.session['user'].rol = 'usuario'
    }

    res
        .status(201)
        .json({
            status: 'success',
            payload: req.session['user']
        })
}

export async function deleteControllerSesion(req, res) {
    req.session.destroy(err => {
        res.status(204).json({ status: 'success' })
    })
}