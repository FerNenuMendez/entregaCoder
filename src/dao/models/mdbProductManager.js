import { randomUUID } from 'crypto'
import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'


const productCollection = 'productos'

const productSchema = new Schema({
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
    },
    methods: {
        getProducts: async function ({ limit } = {}) {
            const productos = await model('productos').find().lean()
            if (!limit) {
                return productos
            } else {
                const res = await this.productCount(limit)
                return res
            }
        },
        productCount: async function (count) {
            const productos = await model('productos').find().lean()
            const respProductos = productos.slice(0, count)
            return respProductos
        },
        getProductById: async function (id) {
            const productos = await model('productos').find({ _id: id }).lean()
            if (productos) {
                return productos
            } else {
                console.log(`Producto con ${id}, no encontrado`)
            }
        },
        updateProduct: async function (id, updateObject) {
            const productos = await model('productos').find().lean()
            const productIndex = productos.findIndex((producto) => producto.id === id);
            if (productIndex !== -1) {
                const producto = productos[productIndex];
                if (updateObject.hasOwnProperty('atributo')) {
                    producto[updateObject.atributo] = updateObject.nuevoValor;
                } else {
                    console.log('El objeto de actualización debe contener un atributo.');
                }
            } else {
                console.log(`Producto con ID ${id} no encontrado.`);
            }
        },
        deleteProduct: async function (id) {
            const borrado = await model('productos').deleteOne({ _id: id }).lean()
            return borrado
        }
    }
})

productSchema.plugin(mongoosePaginate)

export const ProductManager = model(productCollection, productSchema)
