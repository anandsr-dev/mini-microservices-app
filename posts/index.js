const express = require('express')
const crypto = require('crypto')

const app = express()

const posts = {}

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/posts', (req, res) => {
    res.status(200).json({posts})
})

app.post('/posts', (req, res) => {
    const {title} = req.body
    const id = crypto.randomBytes(4).toString('hex')
    posts[id] = {
        id, 
        title
    }
    res.status(201).json({
        status: 'ok',
        posts
    })

})

app.listen(4000, () => {
    console.log('App listening on port 4000')
})