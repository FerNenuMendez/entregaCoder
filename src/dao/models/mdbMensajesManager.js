import { Schema, model } from 'mongoose'
import { Mensaje } from '../mensajeManager.js'

const mensajeSchema = new Schema({
    mensajesContainer: []
}, {
    strict: 'throw',
    versionKey: false,
    statics: {
        create: async function (datos) {
            const mensajes = new Mensaje(datos)
            const msjsCont = await this.model('mensajes').find().lean();
            msjsCont.push(mensajes)
            return mensajes
        },
        msjsAll: async function () {
            const mensajes = await this.model('mensajes').find().lean();
            return mensajes
        }
    },
})

export const MensajesManager = model('mensajes', mensajeSchema)