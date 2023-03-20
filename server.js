require("dotenv").config();

const express = require('express')
require('./app/db/mongoose')

const randomlyRouter = require('./app/routes/randomly.route');

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(randomlyRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})