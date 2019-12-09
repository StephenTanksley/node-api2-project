const express = require('express')
const router = express.Router()

    //root route welcome message
    router.get('/', (req, res) => {
        res.json({ message: "Welcome to the app!"})
    })
   
    router.get("/api", (req, res) => {
    res.json({ message: "Welcome to the /API endpoint."})
    })

module.exports = router

//this endpoint is working.