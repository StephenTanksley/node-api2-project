const express = require('express')

//we have to merge params in routes that are nested further down the chain.
const router = express.Router({mergeParams: true})
let db = require('../data/db')

router.post('/', async (req, res) => {
    if(!req.param.id) {
        return res
            .status(404)
            .json({message:"The post with the specified ID does not exist."})
    }
    if(!req.body.text) {
        return res
                .status(404)
                .json({errorMessage: "Please provide text for the comment."})
    }
    
    try{
        const newComment = { text: req.body.text }
        const commentID = await db.insertComment(newComment)
        const postedComment = await db.findCommentById(commentID)
        res
            .status(201)
            .json(postedComment)
     }
    catch (error) {
        res
            .status(500)
            .json({errorMessage: "The post with the specified ID does not exist."})
    }
})

//All comments.
router.get('/', async (req, res) => {
    if(!req.params.id) {
        return res
                .status(404)
                .json({errorMessage: "The post with the specified ID does not exist."})
    }
    try {
        const postComments = await db.findPostComments(req.params.id)
        res
            .status(200)
            .json(postComments)
    }
    catch (error) {
        res.status(500).json({errorMessage: "The comment could not be retrieved."})
    }
})


//a comment by ID
router.get('/:commentId', async (req, res) => {
    if(!req.params.id || req.params.commentId){
        return res
                .status(404)
                .json({errorMessage: "The post or comment with the specified ID does not exist."})
    }
    try {
        const retrievedComment = await db.findCommentById(req.params.commentId)
        res
            .status(200)
            .json(retrievedComment)
    }
    catch (error) {
        res
            .status(500)
            .json({errorMessage: "The comment with the specified ID could not be retrieved."})
    }
})

module.exports = router