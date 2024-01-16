import { Router, json } from 'express'
import { MensajesManager, ProductManager } from '../../mongodb/mongodb.js'



export const webRouter = Router()
webRouter.use(json())

webRouter.get('/', (req, res) => {
    res.render('home.handlebars', { titulo: 'Productos' })
})

webRouter.get('/products', async (req, res) => {
    try {
        const criterio = {}
        if (req.query.category) { criterio.category = req.query.category }

        const opcionesDePaginacion = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            lean: true
        }
        const result = await ProductManager.paginate(criterio, opcionesDePaginacion)
        console.log(result)
        // res.json(result)
        res.render('products.handlebars', {
            hayDocs: result.docs.length > 0,
            pageTitle: "Productos",
            status: result.status,
            doc: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.prevLink,
            nextLink: result.nextLink
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    }

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

webRouter.get('/api/usuarios/login', (req, res) => {
    res.render('login.handlebars', { pageTitle: 'Login' })
})

webRouter.get('/api/usuarios/register', (req, res) => {
    res.render('register.handlebars', { pageTitle: 'Registrarse' })
})

webRouter.get('/api/usuarios/profile', (req, res) => {
    res.render('profile.handlebars', {
        pageTitle: 'Perfil',
        user: req.user
    })
})