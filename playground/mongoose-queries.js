const {ObjectID} =require('mongodb')
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')

const id = '6bbdf68ef57b7e62b2cbd744'

// if (!ObjectID.isValid(id)) {
//     console.log('id is not valid')
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('todos array', todos)
// })

// Todo.findOne({         //retuns the first one it finds only
//     _id: id
// }).then((todo) => {
//     console.log('todo document', todo)
// })

// Todo.findById(id).then((todo) => {
//     console.log(`Find by ID, ${todo}`)
// }).catch((e) => console.log(e))


const {User} = require('./../server/models/user')

const userId = '5bbd71064764d35eb854d794'

User.findById(userId).then((user) => {
    if (!user) {
        return console.log('Unable to find user')
    }
    console.log('Find User by ID', user)
}).catch((e) => console.log(e))