import express  from "express";
import { productRouter } from './routers/productRouter.js'
import { cartRouter } from './routers/cartRouter.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(productRouter)
app.use(cartRouter)


app.listen(8080, () => { console.log('conectado!') })