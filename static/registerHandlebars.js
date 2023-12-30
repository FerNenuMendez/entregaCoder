const formRegister = document.querySelector('form')

formRegister.addEventListener('submit', async event => {
    event.preventDefault()

    const response = await fetch('http://localhost:8080/api/usuarios/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        // @ts-ignore
        body: new URLSearchParams(new FormData(formRegister))
    })

    if (response.status === 201) {
        const { payload: usuario } = await response.json()
        console.log(usuario)
        window.location.href = '/api/usuarios/login'

    } else {
        const error = await response.json()
        alert(error.message)
    }
})
