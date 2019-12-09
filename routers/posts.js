const express = require('express')
const api = require('./welcome')
const commentRoute = require('./comments')
let db = require('../data/db')

const router = express.Router()

router.use("/:id/comments", commentRoute)
  
  router.get('/', async (req, res) => {
    try {
      const payload = await db.find()
      res
        .json(payload)
    } catch (error) {
      res
        .status(500)
        .json({
          error: "The posts information could not be retrieved."
        })
    }
    
  })

  router.post('/', async (req, res) => {
    if (!req.body.title || !req.body.contents) {
      return res
              .status(400)
              .json({
                error: "Please provide title and/or contents for the post."
          })
    }
    try {
      const post = await db.insert(req.body)
      const newPost = await db.findById(post.id)
    }
    catch (error) {
      res
        .status(500)
        .json({
          error: "There was an error saving the post to the database."
        })
    }
  })

  router.get('/:id', async (req, res) => {
    try {
      const post = await db.findById(req.params.id)
      if (!post) {
        return res
                .status(404)
                .json({ message: "The post with the specified ID does not exist"})
    }
              res
                .status(200)
                .json(post);
    } catch {
              res
                .json(500)
                .json({ error: "The information could not be retrieved"})
    }
  })

module.exports = router