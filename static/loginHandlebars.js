const form = document.getElementById('form')

form?.addEventListener('submit', async event => {
    event.preventDefault()

    const response = await fetch('/api/')
})