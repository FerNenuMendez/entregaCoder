const form = document.getElementById("form")
const inputMensaje = document.getElementById("inputMensaje")
const ulMensajes = document.getElementById("ulMensajes")


Swal.fire({
    title: "Bienvenido al chat! Ingrese su nombre de usuario",
    input: "text",
    showCancelButton: true,
    confirmButtonText: "Entrar",
    allowOutsideClick: false
}).then((result) => {
    if (result.isConfirmed) {
        iniciarChat(result.value)
        inputMensaje?.focus()
    }
})

function iniciarChat(usuario) {

    const socket = io({
        auth: {
            usuario
        }
    })

    form?.addEventListener('submit', event => {
        event.preventDefault()
        const texto = inputMensaje?.value
        if (texto) {
            socket.emit('msjs', {
                timestamp: Date.now(),
                usuario,
                texto
            })
            form.reset()
        }
    })

    socket.on('nuevoUsuario', nuevoUsuario => {

        Swal.fire({
            text: 'Se conecto: ' + nuevoUsuario,
            toast: true,
            position: 'top-right'
        })
    })

    socket.on('usuarioDesconectado', usuarioDesconectado => {

        Swal.fire({
            text: usuarioDesconectado + ' ha abandonado la conversacion',
            toast: true,
            position: 'top-right'
        })
    })

    socket.on('mensajes', mensajes => {

        ulMensajes.innerHTML = ''
        for (const { timestamp, usuario, texto } of mensajes) {
            const li = document.createElement('li')
            li.innerHTML = `(${new Date(timestamp).toLocaleTimeString()}) ${usuario}: ${texto}`
            ulMensajes?.appendChild(li)
        }
    })
}