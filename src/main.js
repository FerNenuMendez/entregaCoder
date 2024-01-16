import express from "express";
import handlebars from 'express-handlebars'
import { webRouter } from "./routers/web/webRouter.js";
import { apiRouter } from "./routers/api/apiRouter.js"
import { Server } from "socket.io";
import { mostrarTiempoReal, onConnection } from "./sockets/socketController.js";
import { PORT } from "./utils/config.js"
import { sesiones } from './middlewares/sesiones.js'
import { passportInitialize, passportSession } from './middlewares/passportConfig.js'

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

app.use(sesiones)
app.use(passportInitialize, passportSession)

app.use(webRouter)
app.use('/api', apiRouter)
