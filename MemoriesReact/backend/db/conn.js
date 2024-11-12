const mongoose = require("mongoose")
require('dotenv').config()

mongoose.set('strictQuery', true)

async function main() {
    await mongoose.connect(`mongodb+srv://luizeduardo2014schmalz:${process.env.DBPASS}@cluster0.1pfdk.mongodb.net/`)
    console.log('conectado ao bd c sucesso')
}

main().catch((err) => console.log(err))

module.exports = main