const formLogout = document.querySelector('form')

formLogout.addEventListener('submit', async event => {
    event.preventDefault()

    const response = await fetch('http://localhost:8080/api/sesiones/current', {
        method: 'DELETE'
    })

    if (response.status === 204) {
        window.location.href = '/api/usuarios/login'
    } else {
        const error = await response.json()
        alert(error.message)
    }
})