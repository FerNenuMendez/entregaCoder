import { pm } from '../controllers/productController.js'
import { MensajesManager } from '../mongodb/mongodb.js'

export function onConnection(socketServer) {
    return async function (socket) {
        console.log('socket conectado')
        console.log('se conectó ' + socket.handshake.auth.usuario)

        socket.broadcast.emit(
            'nuevoUsuario',
            socket.handshake.auth.usuario)
        const db = await pm.getProducts()
        socket.emit(
            'productos',
            db
        )
        socket.emit(
            'mensajes',
            await MensajesManager.find().lean()
        )
        socket.on('msjs', async mensaje => {
            await MensajesManager.create(mensaje)
            socketServer.emit(
                'mensajes',
                await MensajesManager.find().lean()
            )
        })
        socket.on('disconnecting', () => {
            socket.broadcast.emit(
                'usuarioDesconectado',
                socket.handshake.auth.usuario)
        })
    }
}

export function mostrarTiempoReal(socketServer) {
    return function (req, res, next) {
        res['mostrarProductos'] = async () => {
            const db = await pm.getProducts()
            socketServer.emit(
                'productos',
                db
            )
        }
        next()
    }
}

