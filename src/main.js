import express from "express";
import handlebars from 'express-handlebars'
import { productRouter } from './routers/api/productRouter.js'
import { cartRouter } from './routers/api/cartRouter.js'
import { webRouter } from "./routers/web/webRouter.js";
import { Server } from "socket.io";
import { mostrarTiempoReal, onConnection } from "./sockets/socketController.js";
import { PORT } from "./config.js";


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())


const server = app.listen(PORT, () => {
    console.log(`Servidor conectado (puerto: ${PORT})`)
})

const websocketServer = new Server(server)
websocketServer.on('connection', onConnection(websocketServer))

app.use(mostrarTiempoReal(websocketServer))
app.use('/static', express.static('./static'))

app.use(productRouter)
app.use(cartRouter)
app.use(webRouter)
