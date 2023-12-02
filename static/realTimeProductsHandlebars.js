const rtDiv = document.getElementById('rtDiv')

function traerProductos() {
    const socket = io()

    socket.on('productos', producto => {
        const productosHTML = producto.map(product => `
        <h2>Id: ${product.id}</h2>
        <h3>${product.title}</h3>
        <p>Descripción: ${product.description}</p>
        <p>Precio: $${product.price}</p>
        `)

        rtDiv.innerHTML(productosHTML)

    })
}
traerProductos()