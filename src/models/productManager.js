import { randomUUID } from 'crypto'
import { Schema } from 'mongoose'


const productSchema = new Schema({
    id: { type: String, default: randomUUID },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    status: { type: String, required: true },
    category: { type: String, required: true }
}, {
    strict: 'throw',
    versionKey: false,
    statics: {
        getProducts: async function () {
            return await model('productos').find().lean()
        }
    }
})

export const productManager = model('productos', productSchema)