const getuser = (req, res, next) => {
    const user = req.cookies["user"]
    if (!user) return res.redirect("/login")
    next()
}

const haveuser = (req, res, next) => {
    const user = req.cookies["user"]
    if (user) return res.redirect("/")
    next()
}

module.exports = {
    getuser, haveuser
}