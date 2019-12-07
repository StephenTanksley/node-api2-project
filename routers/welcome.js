const express = require('express')
const router = express.Router(
    mergeParams = true,
)
    router.get('/', (req, res) => {
        res.send("<h2>Welcome to the Welcome route.</h2>")
    })
    
    router.get("/api", (req, res) => {
    res.json({ message: "Welcome to the /API endpoint."})
    })

module.exports = router

//this endpoint is working.