const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log ('Connected to MongoDB server')
    
    const db = client.db('TodoApp')


    //Delete Many
    // db.collection('Todos').deleteMany({
    //     test: 'walk the dog'
    // }).then((result) => {
    //     console.log(result)
    // })

    //Delete One - this will delete the first one it finds
    // db.collection('Todos').deleteOne({
    //     text: 'eat this shit'
    // }).then((result) => {
    //     console.log(result)
    // })

    //Find one and Delete
    // db.collection('Todos').findOneAndDelete({
    //     completed: false
    // }).then((result) => {
    //     console.log(result)
    // })

    // db.collection('Users').deleteMany({
    //     name: 'Ryan'
    // }).then((result) => {
    //     console.log(result)
    // })

    // db.collection('Users').findOneAndDelete({
    //     _id: new ObjectID('5bbc057eaa4645543740366d')
    // }).then((result) => {
    //     console.log(result)
    // })

    db.collection('Users').insertOne({
        name: 'Ryan',
        completed: false
    }).then((result) => {
        console.log(result)
    })

})