import {Cart} from '../cartManager.js'

const id = new Date()
const carrito = new Cart()

export async function postController(req, res){
    carrito.crearCarrito()
}

export async function getControllerId(req, res) {
    const id = Number(req.params.id)
    const buscada = await carrito.getPedidoById(id)
    if (!buscada) {
        res.status(404).json({
            message: `persona con id ${id} not found`
        })
    } else {
        res.json(buscada)
    }
}

export async function postControllerProduct(req, res){
    const {data} = req.body
    try {
        const item = await carrito.addPedido([{data}])
        res.json(item)
    } catch (error){
        res.status(400).json({
            message: error.message
        })
    }
}