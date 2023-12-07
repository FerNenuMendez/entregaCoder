// import { ProductManager } from "../services/productManager.js"
import { productManager } from "../../mongodb/mongodb.js"

export const pm = new ProductManager('db/productos.json')


export async function getController(req, res) {
    const { limit } = req.query
    res.json(await pm.getProducts({ limit }))
}

export async function getControllerId(req, res) {
    const id = Number(req.params.id)
    const buscada = await pm.getProductById(id)
    if (!buscada) {
        res.status(404).json({
            message: `persona con id ${id} not found`
        })
    } else {
        res.json(buscada)
    }
    console.log('pase por el product getControllerId')
}

export async function postController(req, res) {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body
    try {
        const item = await pm.addProduct({ title, description, price, thumbnail, code, stock, status, category })
        res.json(item)
        res['mostrarProductos']()
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export async function putController(req, res) {
    const id = Number(req.params.id);
    const updateObject = req.body;

    try {
        const actualizar = await pm.updateProduct(id, updateObject);
        res.json(actualizar);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    };
}

export async function deleteController(req, res) {
    const id = Number(req.params.id)
    try {
        const borrado = await pm.deleteProduct(id)
        res.json(borrado)
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}