// import { randomUUID } from 'crypto'
// import { Schema, model } from 'mongoose'

// const carritoSchema = new Schema({
//     id: { type: String, default: randomUUID },
//     productos: [{
//         id: { type: String, required: true },
//         quantity: { type: Number, default: 1 }
//     }]
// }, {
//     strict: 'throw',
//     versionKey: false,
//     statics: {
//         // addProductsToCarrito: async function (cid, pid, quantity) {
//         //     const db = await model('carrito').find().lean()
//         //     const carritoIndex = db.findIndex((c) => c.id === cid);
//         //     if (carritoIndex !== -1) {
//         //         const carrito = db[carritoIndex];
//         //         const existingProduct = carrito.carrito.find((p) => p.id === pid);
//         //         if (existingProduct) {
//         //             existingProduct.quantity += quantity || 1;
//         //         } else {
//         //             carrito.carrito.push({ id: pid, quantity: quantity || 1 });
//         //         }
//         //         await this.saveCarritos(db);
//         //     } else {
//         //         console.log(`Carrito con ID ${cid} no encontrado`);
//         //     }
//         // }
//     },
//     methods: {
//         getProducts: async function () {
//             return await module('carritos').find().lean()
//         },

//         addProducts: async function (id) {
//             const db = await module('carritos').find().lean()
//             const productsData = { id: id, quantity: 1 }
//             db.push(productsData)
//         },

//         getCarritoProductsById: async function (id) {
//             const carrito = await model('carritos').find({ _id: id }).lean()
//             if (carrito) {
//                 return carrito
//             } else {
//                 console.log(`Carrito con ${id}, no encontrado`)
//             }
//         },

//         addProductsToCarrito: async function (cid, pid, quantity) {
//             const carrito = await model('carritos').find({ _id: cid }).lean()
//             if (!carrito) {
//                 console.log(`Carrito con ID ${cid} no encontrado`);
//             } else {
//                 const existingProduct = carrito.productos.find((p) => p.id === pid)
//                 if (existingProduct) {
//                     existingProduct.quantity += quantity || 1;
//                 } else {
//                     carrito.productos.push({ id: pid, quantity: quantity || 1 });
//                 }
//             }
//         }
//     }
// })

// export const CartManager = model('carritos', carritoSchema)
import { randomUUID } from 'crypto'
import { Schema, model } from 'mongoose'

const carritoSchema = new Schema({
    id: { type: String, default: randomUUID },
    productos: [{
        id: { type: String, required: true },
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
        }
    }
});

export const CartManager = model('carritos', carritoSchema);
