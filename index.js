const express = require('express')
//using express


//importing the various routers we're going to need.
const welcomeRoute = require('./routers/welcome')
const postsRoute = require('./routers/posts')
const commentsRoute = require('./routers/comments')

const server = express()
server.use(express.json())

//router imports
server.use('/', welcomeRoute)
server.use('/posts', postsRoute)
server.use('/comments', commentsRoute)

//setting up port/host for the server listener.
const port = 8080
const host = "127.0.0.1" //this is another way of saying localHost.

server.listen(port, host, () => {
    console.log(`Server running on ${host}:${port}`)
})