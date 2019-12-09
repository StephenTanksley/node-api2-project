const express = require('express')
const app = express()


//importing the various routers we're going to need.
const welcomeRoute = require('./routers/welcome')
const postsRoute = require('./routers/posts')

//setting up port/host for the server listener.
const port = 8080
const host = "127.0.0.1" //this is another way of saying localHost.

app.use(express.json())

//router imports
app.use('/', welcomeRoute)
app.use('/api/posts', postsRoute)

app.listen(port, host, () => {
    console.log(`Server running on ${host}:${port}`)
})
