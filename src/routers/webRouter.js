import { Router } from 'express'


export const webRouter = Router()

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
