import { pm } from '../controllers/productController.js'

export function onConnection(socketServer) {
    return async function (socket) {
        console.log('se conectó exitosamente')
    }
}

export function mostrarTiempoReal(socketServer) {
    return function (req, res, next) {
        res['mostrarProductos'] = async () => {
            const db = await pm.getProducts()
            console.log(db)
            socketServer.emit(
                'productos',
                db
            )
        }
        next()
    }
}

