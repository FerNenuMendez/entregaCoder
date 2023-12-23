import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'

const collection = 'usuarios'

const usuarioSchema = new Schema({
    _id: { type: String, default: randomUUID },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
}, {
    strict: 'throw',
    versionKey: false
})
export const UsuarioManager = model(collection, usuarioSchema)