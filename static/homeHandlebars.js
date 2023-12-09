const divProductos = document.getElementById('productos')


fetch('http://localhost:8080/api/products/')
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`)
        }
        return res.json()
    })
    .then(data => {
        const db = data
        const productosHTML = db.map(product => `
        <h2>Id: ${product._id}</h2>
        <h3>${product.title}</h3>
        <p>Descripción: ${product.description}</p>
        <p>Precio: $${product.price}</p>
        `).join('')

        divProductos.innerHTML = productosHTML
    })
    .catch(error => {
        console.error('Ocurrio un error', error)
    })

