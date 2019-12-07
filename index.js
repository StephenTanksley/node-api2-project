const express = require('express')

const app = express()

app.use(express.json())

const port = 8080
const host = "127.0.0.1" //another name for localhost

server.listen(host, port, () => {
    console.log(`Server running on ${host}:${port}`)
})