//import { CartsManager } from '../dao/cartManager.js'
import { CartManager } from "../mongodb/mongodb.js"


export const db = new CartManager()


export async function postControllerCart(req, res) {
    const { productos } = req.body
    const nuevoCarrito = await CartManager.create({ productos: productos })
    res.json(nuevoCarrito)
}

export async function getControllerCartProduct(req, res) {
    const cid = (req.params.id)
    const buscado = await db.getCarritoProductsById(cid)
    if (!buscado._eventsCount === 0) {
        res.status(404).json({
            message: `Carrito con id ${cid} not found`
        })
    } else {
        res.json(buscado)
    }
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

export async function putControllerCart(req, res) {
    try {
        const cid = (req.params.cid)
        const pid = (req.params.pid)
        const { quantity } = req.body;
        if (!Number.isInteger(quantity) || quantity < 0) {
            return res.status(400).json({ error: 'La quantity debe ser un número entero positivo.' });
        }
        const carrito = await db.changeStockProduct(cid, pid, quantity)
        return res.status(200).json({ mensaje: `cantidad del producto con ID ${pid} actualizada en el carrito ${cid}.` });
    } catch (error) {
        console.error('Error al actualizar la cantidad del producto en el carrito:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

export async function deleteControllerProductCart(req, res) {
    const cid = (req.params.cid)
    const pid = (req.params.pid)
    const borrado = await db.deleteProducts(cid, pid)
    res.json(borrado)
}

export async function deleteTotalControllerProductCart(req, res) {
    try {
        const { cid } = req.params;
        const carrito = await db.deleteTotalProducts(cid)
        if (!carrito) {
            return res.status(404).json({ error: `Carrito con ID ${cid} no encontrado.` });
        }
        return res.status(200).json({ mensaje: `Todos los productos del carrito ${cid} han sido eliminados.` });
    } catch (error) {
        console.error('Error al eliminar todos los productos del carrito:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
}