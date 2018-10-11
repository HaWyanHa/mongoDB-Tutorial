const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

// Todo.remove({}).then((result) => {
//     console.log(result)
// })

// Todo.findOneAndRemove()

Todo.findByIdAndRemove('5bbf8540d8b6681f397b253b').then((todoDoc) => {
        console.log(todoDoc)
})

