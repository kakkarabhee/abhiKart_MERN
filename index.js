const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const path=require("path")

const router = require("./Routes/index")

require("./dbConnect")
const app = express()
app.use(cors())

app.use("/public", express.static("public"))
app.use(express.static(path.join(__dirname,'build')))

app.use(express.json())
app.use("/api", router)

app.use('*', express.static(path.join(__dirname,'build')))

const PORT = process.env.PORT || 10000
app.listen(PORT, () => console.log(`Server is Running at port no ${PORT}`))