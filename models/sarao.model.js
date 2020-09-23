const mongoose = require("mongoose")
const Schema = mongoose.Schema

const saraoSchema = new Schema({
    name: { type: String, required: true},
    image: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    startDate: { type: Date, required: true, default: new Date},
    startString: String,
    endDate: { type: Date, required: true, default: new Date},
    endString: String,
    location: String,
    userList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    prize: { type: String, required: true},
    punishment: { type: String, required: true},

}, {
    timestamps: true
})

const Sarao = mongoose.model("Sarao", saraoSchema)

module.exports = Sarao 