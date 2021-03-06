const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} =require('mongodb')
const _ = require('lodash')


const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')

const app = express();
const port = process.env.PORT || 3000 //if process env port is there, then we are on heroku


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

//GET /todos/1234567 fetch this value and make a query

app.get('/todos/:id', (request, response) => {
    let id = request.params.id
    

    //valid id using isValid

    if (!ObjectID.isValid(id)) {
        return response.status(404).send()  //sends back an empty body
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return response.status(404).send("think I am here")
        }
        response.send({
            todo: todo
        })
    }).catch((e) => {
        response.status(400).send("hello")
    })

})

app.delete('/todos/:id', (request, response) => {
    //Get the ID
    let id = request.params.id
    //Validate the id
    if (!ObjectID.isValid(id)) {
        return response.status(404).send('response is not valid so i sent back a 404')
    }
    //remove todo by ID
    Todo.findByIdAndRemove(id).then((todoDoc) => {
        if (!todoDoc) {
            return response.status(404).send("there was no doc")
        }
        response.send(todoDoc)
    }).catch((e) => {
        response.status(400).send("the error was", e)
    })

})

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id
    let body =_.pick(req.body, ['text', 'completed'])

    if (!ObjectID.isValid(id)) {
        return response.status(404).send('response is not valid so i sent back a 404')
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false
        body.completedAt = null
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }

        res.send({todo})

    }).catch((e) => {
        res.status(400).send()
    })



})

    //POST /users
app.post('/users', (request, response) => {
        
    let body =_.pick(request.body, ['email', 'password'])
    let user = new User(body)

    
    user.save().then(() => {
        return user.generateAuthToken()
    }).then((token) => {
        response.header('x-auth', token).send(user)
    }).catch((error) => {
        response.status(400).send(error)
        console.log('here')
    })
})
    

app.listen((port), () => {
    console.log('started on port 3000', port)
})

module.exports = {app}
