import { Schema, model, mongoose } from 'mongoose'
import { ADMIN_EMAIL } from '../../utils/config.js'
import { hasheadasSonIguales } from '../../utils/criptografia.js'

const collection = 'usuarios'

const usuarioSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
}, {
    strict: 'throw',
    versionKey: false,
    statics: {
        login: async function (email, password) {
            let datosUsuario

            if (email === ADMIN_EMAIL && password === 'adminCod3r123') {
                datosUsuario = {
                    email: 'admin',
                    nombre: 'admin',
                    apellido: 'admin',
                    rol: 'admin'
                }
            } else {
                const usuario = await mongoose.model(collection).findOne({ email }).lean()

                if (!usuario) {
                    throw new Error('login failed')
                }

                if (!hasheadasSonIguales(password, usuario['password'])) {
                    throw new Error('login failed')
                }

                datosUsuario = {
                    email: usuario['email'],
                    nombre: usuario['nombre'],
                    apellido: usuario['apellido'],
                    rol: 'usuario'
                }
            }
            return datosUsuario
        }
    }
})
export const UsuarioManager = model(collection, usuarioSchema)