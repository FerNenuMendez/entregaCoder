const formRegister = document.getElementById('registerForm')

formRegister?.addEventListener('submit', async event => {
    event.preventDefault()

    const response = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        // @ts-ignore
        body: new URLSearchParams(new FormData(formRegister))
    })

    if (response.status === 201) {
        const { payload: usuario } = await response.json()
        console.log(JSON.stringify(usuario))
        window.location.href = '/login'
    } else {
        const error = await response.json()
        alert(error.message)
    }
})
