import { Router, json } from 'express'
import { MensajesManager } from '../mongodb/mongodb.js'


export const webRouter = Router()
webRouter.use(json())

webRouter.get('/', (req, res) => {
    res.render('home.handlebars', { titulo: 'Productos' })
})

webRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts.handlebars', { titulo: 'ProductosRT' })
    try {
        res['mostrarProductos']()
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
})

webRouter.get('/chat', (req, res) => {
    res.render('chat.handlebars', { titulo: 'Chat' })
})

webRouter.post('/chat', async (req, res) => {
    try {
        const mensaje = req.body
        await MensajesManager.create(mensaje)
        res['notificarNuevoMensaje']()
        res.status(201).json()
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
})