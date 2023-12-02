import express from "express";
import { productRouter } from './routers/productRouter.js'
import { cartRouter } from './routers/cartRouter.js'
import handlebars from 'express-handlebars'
import { webRouter } from "./routers/webRouter.js";
import { Server } from "socket.io";
import { mostrarProductosTiempoReal } from "./sockets/socketController.js";

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor conectado (puerto: ${PORT})`)
})



const websocketServer = new Server(server)


app.use(mostrarProductosTiempoReal(websocketServer))
app.use('/static', express.static('./static'))

app.use(productRouter)
app.use(cartRouter)
app.use(webRouter)

