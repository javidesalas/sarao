const mongoose = require("mongoose")
const Schema = mongoose.Schema

const saraoSchema = new Schema({
    name: { type: String, required: true},
    image: {
        type: String,
        default: 'https://vignette.wikia.nocookie.net/rickandmorty/images/d/d3/Anatomy_Park_7.png/revision/latest?cb=20160913082442'
    },
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