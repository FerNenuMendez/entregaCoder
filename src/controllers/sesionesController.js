import { onlyLogueadosRest } from '../middlewares/autorizaciones.js'

export async function getControllerSesion(req, res) {
    onlyLogueadosRest(),
        res.json(req.user)
}

export async function deleteControllerSesion(req, res) {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ status: 'logout error', body: err })
        }
        res.json({ status: 'success', message: 'logout OK' })
    })
}