import fs from 'fs/promises'

export function notNull(valor) {
    if (valor === null || valor === undefined) {
        console.log('error')
    }
    return valor
}

export function notZero(valor) {
    notNull(valor)
    if (notNull(valor) < 0) {
        return 0
    } else {
        return valor
    }
}

class Product {

    constructor({ id = 0, title, description, price, thumbnail, code, stock, status, category }) {
        this.id = notNull(id, 'id')
        this.title = notNull(title, 'nombre')
        this.description = notNull(description, 'descripcion')
        this.price = notZero(price, 'precio')
        this.thumbnail = notNull(thumbnail, 'imagen')
        this.code = notNull(code, 'codigo')
        this.stock = notZero(stock, 'stock')
        this.status = notNull(status, 'status')
        this.category = notNull(category, 'category')
    }

    asPOJO() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            price: this.price,
            thumbnail: this.thumbnail,
            code: this.code,
            stock: this.stock,
            status: this.status,
            category: this.category
        }
    }

}

export class ProductManager {
    #path
    #products

    constructor(ruta) {
        this.#path = ruta
        this.#products = [];
    }

    async getProducts({ limit } = {}) {
        const productos = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
        if (!limit) {
            return productos
        } else {
            const res = await this.productCount(limit)
            return res
        }

    }

    async saveProducts(productos) {
        await fs.writeFile(this.#path, JSON.stringify(productos, null, 2));
    }

    async addProduct(data) {
        const { thumbnails, ...restData } = data;
        const productos = await this.getProducts();
        const nextId = productos.length + 1;
        const productData = {
            id: nextId,
            ...restData,
            thumbnails: thumbnails || []
        }
        const product = new Product(productData);
        productos.push(product);
        await this.saveProducts(productos);
    }



    async getProductById(id) {
        const db = await this.getProducts()
        const prodBuscado = db.find((e) => e.id === id)
        if (prodBuscado) {
            return prodBuscado
        } else {
            console.log(`Producto con ${id}, no encontrado`)
        }
    }

    async deleteProduct(id) {
        const db = await this.getProducts()
        const index = db.findIndex((producto) => producto.id === id)
        const nuevaDb = [...db.slice(0, index), ...db.slice(index + 1)]
        await fs.writeFile(this.#path, JSON.stringify(nuevaDb, null, 2))
    }

    async updateProduct(id, updateObject) {
        const productos = await this.getProducts();
        const productIndex = productos.findIndex((producto) => producto.id === id);
        if (productIndex !== -1) {
            const producto = productos[productIndex];
            if (updateObject.hasOwnProperty('atributo')) {
                producto[updateObject.atributo] = updateObject.nuevoValor;
                await this.saveProducts(productos);
            } else {
                console.log('El objeto de actualización debe contener un atributo.');
            }
        } else {
            console.log(`Producto con ID ${id} no encontrado.`);
        }
    }

    async productCount(count) {
        const productos = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
        const respProductos = productos.slice(0, count)
        return respProductos
    }
}
