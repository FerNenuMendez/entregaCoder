import { randomUUID } from 'crypto'
import { Schema } from 'mongoose'

const carritoSchema = new Schema({
    id: {type:String, default: randomUUID},
    productos: { type:[Object] }
}, {
    strict:'throw',
    versionKey: false,
    statics:{
        addProductsToCarrito: async function(cid, pid, quantity){
            const db = await model('productos').find().lean()
            const carritoIndex = db.findIndex((c) => c.id === cid);
            if (carritoIndex !== -1) {
                const carrito = db[carritoIndex];
                const existingProduct = carrito.productos.find((p) => p.id === pid);
                if (existingProduct) {
                    existingProduct.quantity += quantity || 1;
                } else {
                    carrito.productos.push({ id: pid, quantity: quantity || 1 });
                }
                await this.saveCarritos(db);
            } else {
                console.log(`Carrito con ID ${cid} no encontrado`);
            }
        }
    },
    methods:{
        getProducts: async function(){
            return await module('carritos').find().lean()
        },
        addProducts: async function(id) {
            const db = await module('carritos').find().lean()
            const productsData = { id: id, quantity: 1 }
            db.push(productsData)
        }
    }

})

export const cartManager = model('carritos', carritoSchema)