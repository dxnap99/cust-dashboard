const setCookies = (res, user) => {
    res.cookie("user", JSON.stringify(user), { maxAge: 24 * 60 * 60 * 1000 * 30 });
}

module.exports = {
    setCookies
}