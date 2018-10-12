const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const UserSchema = new mongoose.Schema({
        email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {  //validator library used from a 3rd party
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{      //you can use tokens in MongoDB
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
})

UserSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject() //converts a mongo user to an object

    return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function() {
    let user = this
    let access = 'auth'
    let token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'somesecretvalue').toString()

    user.tokens.push({access, token})

    return user.save().then(() => {
        return token
    })
}



const User = mongoose.model('User', UserSchema)


// const userOne = new User({
    
// })

// userOne.save().then((doc => {
//     console.log('User saved', doc)
// }), (error) => {
//     console.log('Something went wrong', error)
// })


module.exports = {User}