const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true, lowercase: true }, //match: '/^\S/' 
    email: { type: String, required: false },
    password: { type: String, required: true },
    image: String,
    karma: Number,
    activeSarao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sarao'
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User