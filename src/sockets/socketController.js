import { db } from '../controllers/cartController.js'

export function mostrarProductosTiempoReal(socketServer) {
    return function (req, res, next) {
        res['mostrarProductos'] = async () => {

            const baseProduct = await db.getDb()
            console.log(baseProduct)

        }
        next()
    }
}