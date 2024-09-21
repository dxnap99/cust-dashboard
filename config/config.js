const dotenv = require("dotenv")
dotenv.config()


module.exports = {
    DB_URI: process.env.DB_URI,
    SECRET_KEY: process.env.SECRET_KEY,
    PORT: process.env.PORT
}