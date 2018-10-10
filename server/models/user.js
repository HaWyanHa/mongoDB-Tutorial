const mongoose = require('mongoose')


const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
})

// const userOne = new User({
    
// })

// userOne.save().then((doc => {
//     console.log('User saved', doc)
// }), (error) => {
//     console.log('Something went wrong', error)
// })


module.exports = {User}