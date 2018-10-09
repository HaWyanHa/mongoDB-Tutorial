//const MongoClient = require('mongodb').MongoClient
const {MongoClient} = require('mongodb')  //this code is identical to the code above ES6 destructuring
const {ObjectID} = require('mongodb')

// let obj = new ObjectID()
// console.log(obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log ('Connected to MongoDB server')
    const db = client.db('TodoApp')

    // db.collection('Todos').insertOne({
    //     test: 'Something to do', 
    //     completed: false
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert todo', error)
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })

    // db.collection('Users').insertOne({
    //     name: 'Ryan',
    //     age: '30',
    //     location: 'DC'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to create user', err)
    //     }

    //     console.log(result.ops[0]._id.getTimestamp())
    // })

    client.close()   //this closes the connection with the MongoDB server
})