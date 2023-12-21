import { randomUUID } from 'crypto'
import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const cartCollection = 'carritos'

const carritoSchema = new Schema({

    productos: [{
        id: { type: String, required: true, ref: 'products' },
        quantity: { type: Number, default: 1 }
    }]
}, {
    strict: 'throw',
    versionKey: false,
    statics: {},
    methods: {
        getProducts: async function () {
            return await this.model('carritos').find().lean();
        },

        addProducts: async function (id) {
            const db = await this.model('carritos').find().lean();
            const productsData = { id: id, quantity: 1 };
            db.push(productsData);
        },

        getCarritoProductsById: async function (id) {
            const carrito = await this.model('carritos').findById(id).lean();
            if (carrito) {
                return carrito;
            } else {
                console.log(`Carrito con ${id}, no encontrado`);
            }
        },

        addProductsToCarrito: async function (cid, pid, quantity) {
            try {
                const carrito = await this.model('carritos').findById(cid);
                if (!carrito) {
                    console.log(`Carrito con ID ${cid} no encontrado`);
                    return;
                }
                const existingProduct = carrito.productos.find((p) => p.id === pid);
                if (existingProduct) {
                    existingProduct.quantity += quantity || 1;
                } else {
                    carrito.productos.push({ id: pid, quantity: quantity || 1 });
                }
                await carrito.save();
            } catch (error) {
                console.error('Error al agregar productos al carrito:', error);
            }
        },

        changeStockProduct: async function (cid, pid, quantity) {
            try {
                const carrito = await this.model('carritos').findById(cid);
                if (!carrito) {
                    console.log(`Carrito con ID ${cid} no encontrado`);
                    return;
                }
                const indiceProducto = carrito.productos.findIndex(producto => producto.id === pid);
                if (indiceProducto === -1) {
                    console.log(`Producto con ID ${pid} no encontrado en el carrito.`);
                }
                carrito.productos[indiceProducto].quantity = quantity;
                await carrito.save();
            } catch (error) {
                console.error('Error al cambiar el producto del carrito:', error);
            }
        },

        deleteProducts: async function (cid, pid) {
            try {
                const carrito = await this.model('carritos').findById(cid);
                if (!carrito) {
                    console.log(`Carrito con ID ${cid} no encontrado`);
                    return;
                }
                carrito.productos = carrito.productos.filter(producto => producto.id !== pid);
                await carrito.save();
                console.log(`Producto con ID ${pid} eliminado del carrito ${cid}`)
            } catch {
                console.error('Error al eliminar producto del carrito:', error);
            }
        },

        deleteTotalProducts: async function (cid) {
            try {
                const carrito = await this.model('carritos').findById(cid);
                if (!carrito) {
                    console.log(`Carrito con ID ${cid} no encontrado`);
                    return;
                }
                carrito.productos = [];
                await carrito.save();
                console.log(`Carrito con ID ${cid} vaciado`)
            } catch {
                console.error('Error al eliminar producto del carrito:', error);
            }
        }
    }
});

carritoSchema.plugin(mongoosePaginate)

carritoSchema.pre('find', function (next) {
    this.populate.apply('products')
    next()
})

export const CartManager = model(cartCollection, carritoSchema);
