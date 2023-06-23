const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use(require("./routes"))
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT

app.listen(port, () => console.log(`app listening on port: ${port}`))