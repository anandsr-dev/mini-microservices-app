const express = require('express')
const crypto = require('crypto')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const commentsById = {}

app.get('/posts/:id/comments', (req, res) => {

    res.status(200).json({
        comments: commentsById[req.params.id]
    })

})

app.post('/posts/:id/comments', (req, res) => {
const {content} = req.body
const postId = req.params.id

const id = crypto.randomBytes(4).toString('hex')

const comments = commentsById[postId] || []

comments.push({id, content})

commentsById[postId] = comments

res.status(201).json({
    status: 'ok',
    comments
})

})

app.listen(4001, () => {
    console.log('App listening on 4001')
})