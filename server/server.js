const express = require('express')
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')

const app = express();

app.use(bodyParser.json())

app.post('/todos', (request, response) => {
    console.log(request.body)

    let todo = new Todo({
        text: request.body.text
    })

    todo.save().then((doc) => {
        response.send(doc)
    }, (e) => {
        response.status(400).send(e)
    })
})

app.get('/todos', (request, response) => {
    Todo.find().then((todos) => {
        response.send({       //sends todos array back, so better to send back an object set to the todos array
            todos
        })
    }, (e) => {
        response.status(400).send(e)
    })
})




app.listen((3000), () => {
    console.log('started on port 3000')
})