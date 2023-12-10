const isLogged = (req, res, next) => {
    if (req.query.admin === "true") {
        req.isLogged = true

    next()
     } else {
    return res.status(401).send('Necesitas loguearte para ingresar');
     }
}

module.exports = {
    isLogged
}
