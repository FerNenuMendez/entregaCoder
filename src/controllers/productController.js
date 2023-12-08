// import { ProductManager } from "../dao/productManager.js"
import { ProductManager } from "../mongodb/mongodb.js"


export const pm = new ProductManager()


export async function getController(req, res) {
    const { limit } = req.query
    res.json(await pm.getProducts({ limit }))
}

export async function getControllerId(req, res) {
    const id = (req.params.id)
    const buscada = await pm.getProductById(id)
    if (!buscada) {
        res.status(404).json({
            message: `persona con id ${id} not found`
        })
    } else {
        res.json(buscada)
    }
}

export async function postController(req, res) {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body
    try {
        const item = await pm.collection.insertOne({ title, description, price, thumbnail, code, stock, status, category })
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
    const objectId = (req.params.id)
    try {
        const resultado = await pm.deleteProduct(objectId)
        if (resultado.deletedCount === 0) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            });
        }
        res.json({
            message: 'Producto eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}