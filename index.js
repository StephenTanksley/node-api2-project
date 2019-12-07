const express = require('express')
const commentsRouter = require('./routers/comments')
const postRouter = require('./routers/posts')

const app = express()

server.use('/api/posts', postRouter)
server.use('/comments', commentsRouter)

app.use(express.json())

const port = 8080
const host = "127.0.0.1" //another name for localhost

server.listen(host, port, () => {
    console.log(`Server running on ${host}:${port}`)
})