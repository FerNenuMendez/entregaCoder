import { CartsManager } from '../cartManager.js'
import fs from 'fs/promises'

const db = new CartsManager()


export async function postControllerCart(req, res) {
    const nuevoCarrito = await db.nuevoCarrito()
    res.json(nuevoCarrito)
}

export async function getControllerIdCart(req, res) {
    const id = Number(req.params.id)
    const buscado = await db.getCarritoProductsById(id)
    if (!buscado) {
        res.status(404).json({
            message: `Carrito con id ${id} not found`
        })
    } else {
        res.json(buscado)
    }
}



export async function postControllerProductCart(req, res) {
    const cid = Number(req.params.cid)
    const pid = Number(req.params.pid)
    const buscado = await db.addProductsToCarrito(cid, pid)
    res.json(buscado)
}
