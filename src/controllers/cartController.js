//import { CartsManager } from '../dao/cartManager.js'
import { CartManager } from "../mongodb/mongodb.js"


export const db = new CartManager()


export async function postControllerCart(req, res) {
    const nuevoCarrito = await CartManager.create()
    res.json(nuevoCarrito)
}

export async function getControllerIdCart(req, res) {
    const id = (req.params.id)
    const buscado = await db.getCarritoProductsById(id)
    if (!buscado._eventsCount === 0) {
        res.status(404).json({
            message: `Carrito con id ${id} not found`
        })
    } else {
        res.json(buscado)
    }
}



export async function postControllerProductCart(req, res) {
    const cid = (req.params.cid)
    const pid = (req.params.pid)
    const buscado = await db.addProductsToCarrito(cid, pid)
    res.json(buscado)
}
