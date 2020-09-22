const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true, lowercase: true }, //match: '/^\S/' 
    email: { type: String, required: false },
    password: { type: String, required: true },
    image: {
        type: String,
        default: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
    },
    karma: {
        type: Number,
        default: 0
    },
    activeSarao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sarao'
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    role: {
        type: String,
        enum: ['admin', 'user']
    }

}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User