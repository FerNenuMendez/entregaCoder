import mongoose from "mongoose";
import { ATLASDB_STRG } from "../utils/config.js"

await mongoose.connect(ATLASDB_STRG)
//await mongoose.connect('mongodb+srv://fermodmen:<>@clusterdata.xlbloof.mongodb.net/')


export { ProductManager } from '../dao/models/mdbProductManager.js'
export { CartManager } from '../dao/models/mdbCartManager.js'
export { MensajesManager } from '../dao/models/mdbMensajesManager.js'
export { UsuarioManager } from '../dao/models/mdbUsuariosManager.js'