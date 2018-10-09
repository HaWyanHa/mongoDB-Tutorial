//const MongoClient = require('mongodb').MongoClient
const {MongoClient} = require('mongodb')  //this code is identical to the code above ES6 destructuring
const {ObjectID} = require('mongodb')

let obj = new ObjectID()
console.log(obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log ('Connected to MongoDB server')
    const db = client.db('TodoApp')

    db.collection('Todos').find({
        _id: new ObjectID('5bbcedbad8b6681f397ae292')
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2))
    }, (err) => {
        console.log('unable to fetch todos', err)
    })

//    client.close()   //this closes the connection with the MongoDB server
})