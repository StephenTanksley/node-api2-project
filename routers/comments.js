const express = require('express')

//we have to merge params in routes that are nested further down the chain.
const router = express.Router({mergeParams: true})
let db = require('../data/db')

router.get('/', (req, res) => {
    res.json({ message: "Welcome to the comments section. "})
})

module.exports = router