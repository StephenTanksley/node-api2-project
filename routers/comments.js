const express = require('express')
const router = express.Router({
    mergeParams: true,
})

router.get('/comments', (req, res) => {
    console.log(req.params)
})

module.exports = router