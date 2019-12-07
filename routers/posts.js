const express = require('express')

const router = express.Router({
  //allows params from the parent router to get passed to the child router.
  mergeParams: true,
})
  
  router.get('/posts', (req, res) => {
    res.send({ "<h2>Welcome to the Posts endpoint</h2>" })
  })

module.exports = router