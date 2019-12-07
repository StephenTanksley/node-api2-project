const express = require('express')
const router = express.Router()
  
  router.get("/api/posts/", (req, res) => {
      console.log(req.params)
    // res.json({ message: "Welcome to the Hubs API" })
  })

module.exports = router