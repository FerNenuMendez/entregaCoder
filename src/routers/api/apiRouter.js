import { Router } from 'express'
import { cartRouter } from './cartRouter.js'
import { productRouter } from './productRouter.js'
import { usuariosRouter } from './usuariosRouter.js'
import { sesionesRouter } from './sesionesRouter.js'

export const apiRouter = Router()

apiRouter.use('/carts', cartRouter)
apiRouter.use('/products', productRouter)
apiRouter.use('/usuarios', usuariosRouter)
apiRouter.use('/sesiones', sesionesRouter)