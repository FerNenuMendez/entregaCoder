
import { onlyLogueadosRest } from '../middlewares/autorizaciones.js'

export async function getControllerSesion(req, res) {
    onlyLogueadosRest(),
        res.json(req.user)
}

export async function deleteControllerSesion(req, res) {
    req.session.destroy(err => {
        res.status(204).json({ status: 'success' })
    })
}