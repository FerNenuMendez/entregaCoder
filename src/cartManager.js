import fs from 'fs/promises'

export class Cart {
    #id
    #cart
    #path

    constructor(id){
        this.#id=id
        this.#cart = []
        this.#path='db/carrito.json'
    }

    async crearCarrito(){
        const carrito = {id: this.#id, products: this.#cart }
        await fs.writeFile(this.#path, JSON.stringify(carrito, null, 2))
    }

    async savePedidos(pedido) {
        await fs.writeFile(this.#path, JSON.stringify(pedido, null, 2));
    }

    async getCarrito() {
        const carrito = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
        return carrito
    }

    async getPedidoById(id) {
        const db = await this.getCarrito()
        const pedidoBuscado = db.find((e) => e.id === id)
        if (pedidoBuscado) {
            return pedidoBuscado
        } else {
            console.log(`Producto con ${id}, no encontrado`)
        }

    }
    async addPedido(data){
        const carrito = await this.getCarrito()
        const nextId = carrito.length + 1;
        const pedidoData = {id:nextId, products:data}
        carrito.push(pedidoData)
        await this.savePedidos(carrito)
    }
} 