const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    _id: {type: String, required: true},
    surveys: {type: []}
})

module.exports = mongoose.model('User', userSchema);