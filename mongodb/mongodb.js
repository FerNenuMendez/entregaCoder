import mongoose from "mongoose";

await mongoose.connect('mongodb://localhost/data/e-commerce')
export { productManager } from '../src/models/productManager.js'
export { cartManager } from '../src/models/cartManager.js'