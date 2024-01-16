export function onlyLogueadosRest(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(403).json({ status: 'error', message: 'necesita iniciar sesion' })
    }
    next()
}

// export function onlyLogueadosWeb(req, res, next) {
//     if (!req.session['user']) {
//         return res.redirect('/api/usuarios/login')
//     }
//     next()
// }