const express = require('express')

//we have to merge params in routes that are nested further down the chain.
const router = express.Router({mergeParams: true})
let db = require('../data/db')

router.get('/comments', (req, res) => {
    console.log(req.params)
})

module.exports = router