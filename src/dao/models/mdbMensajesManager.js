import { Schema, model } from 'mongoose'


const mensajeSchema = new Schema({
    timestamp: { type: Date },
    usuario: { type: String },
    texto: { type: String }
}, {
    strict: 'throw',
    versionKey: false,
    statics: {
    },
    methods: {
    }
})

export const MensajesManager = model('mensajes', mensajeSchema)