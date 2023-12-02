import { Router } from 'express'
import { mostrarProductosTiempoReal } from '../sockets/socketController.js'

export const webRouter = Router()

webRouter.get('/', (req, res) => {
    res.render('home.handlebars', { titulo: 'Productos' })
})

webRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts.handlebars', { titulo: 'ProductosRT' })
    res['mostrarProductos']()
    res.status(200).json()
})
