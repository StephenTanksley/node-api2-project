const express = require('express')
const api = require('./welcome')
const commentRoute = require('./comments')
let db = require('../data/db')

const router = express.Router()

// We specify the next link in the chain in each preceding link. 
// Posts precede comments, so we specify comments inside of posts, etc.

router.use("/:id/comments", commentRoute)

//C of CRUD - CREATE
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
    const createdPost = await db.findById(post.id)
    res
      .status(201)
      .json(createdPost)
  }
  catch (error) {
    res
    .status(500)
    .json({
      error: "There was an error saving the post to the database."
    })
  }
})


//R of CRUD - READ. We're getting the full list of posts here.
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

//R of CRUD - READ:ID. This time, we're getting only a specific post.
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


//D of CRUD - DELETE. We're using the req.params.id to find a post in our database to delete it.
router.delete('/:id', async (req, res) => {
  try {
    const target = await db.findById(req.params.id)
    if (!target) {
      return res
              .status(404)
              .json({ message: "The post with the specified ID does not exist"})
    }
    await db.remove(req.params.id)
      res
        .status(204)
        .json(target)
        .json({ message: "Post has been deleted."})
  }
  catch {
    res
      .status(500)
      .json({ error: "The post could not be removed."})
  }
})


//U of CRUD - UPDATE. We're using an ID to find the target to update, then using the updatedPost to update values existing in our db.
router.put('/:id', async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res
            .status(400)
            .json({ error: "Please provide title and/or contents for the post."})
  }
  try {
    const target = await db.findById(req.params.id)
    if (!target) {
      return res
        .status(404)
        .json({error: "The post with the specified ID does not exist."})
    }

      const updatedPost = {
        title: req.body.title,
        contents: req.body.contents
      }
      const newUpdatedPost = await db.update(updatedPost)
        res
          .status(200)
          .json(newUpdatedPost)
  }
  catch (error) {
    res
      .status(500)
      .json({ error: "There was an error while saving the post to the database."})
  }
})


module.exports = router