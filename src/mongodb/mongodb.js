import mongoose from "mongoose";

await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')

//await mongoose.connect('mongodb+srv://fermodmen:Feer1688NenuCo2307@clusterdata.xlbloof.mongodb.net/')

export { ProductManager } from '../dao/models/mdbProductManager.js'
export { CartManager } from '../dao/models/mdbCartManager.js'