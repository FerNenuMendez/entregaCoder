import { randomUUID } from 'crypto'
import fs from 'fs/promises'

export class Carrito {
    constructor({ id }) {
        this.id = id
        this.productos = []
    }
    toPOJO() {
        return {
            id: this.id,
            productos: this.productos
        }
    }
    async getProducts() {
        const products = await this.productos
        return products
    }
    async addProducts(id) {
        const db = await this.getProducts()
        const productsData = { id: id, quantity: 1 }
        db.push(productsData)
    }
}

export class CartsManager {
    #path
    constructor() {
        this.products = [];
        this.#path = 'db/carritos.json'
    }
    async getDb() {
        const db = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
        return db
    }

    async saveCarritos(productos) {
        await fs.writeFile(this.#path, JSON.stringify(productos, null, 2));
    }

    async nuevoCarrito() {
        const db = await this.getDb()
        // const nextID = db.length + 1
        const carritoData = { id: randomUUID(), products: [] }
        const carrito = new Carrito(carritoData)
        db.push(carrito)
        await this.saveCarritos(db)
    }
    async getCarritoProductsById(id) {
        const db = await this.getDb()
        const carritoBuscado = db.find((e) => e.id === id)
        if (carritoBuscado) {
            return carritoBuscado
        } else {
            console.log(`Carrito con ${id}, no encontrado`)
        }
    }
    async addProductsToCarrito(cid, pid, quantity) {
        const db = await this.getDb();
        const carritoIndex = db.findIndex((c) => c.id === cid);

        if (carritoIndex !== -1) {
            const carrito = db[carritoIndex];

            const existingProduct = carrito.productos.find((p) => p.id === pid);
            if (existingProduct) {
                existingProduct.quantity += quantity || 1;
            } else {
                carrito.productos.push({ id: pid, quantity: quantity || 1 });
            }
            await this.saveCarritos(db);
        } else {
            console.log(`Carrito con ID ${cid} no encontrado`);
        }
    }

}

