const mongoose = require("mongoose")
const Schema = mongoose.Schema

const eventSchema = new Schema({
    name: { type: String, required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sarao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sarao'
    },
    image: {
        type: String,
        default: 'https://vignette.wikia.nocookie.net/rickandmorty/images/f/f1/S4e1_2019-11-13-12h56m54s682.png'
    },
    description: String,
    startDate: { type: Date, required: true, default: new Date },
    dateString: String,
    timeString: String,
    duration: Number, //default 60 minutes
    location: String,
    karmaPlus: { type: Number, min: 0 },
    karmaMinus: { type: Number, max: 0 },
    userPlus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    userMinus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    finished: { type: Boolean, default: false},

    cssConcurrence: Number,
    cssOverlaps: Boolean

}, {
    timestamps: true
})

const Event = mongoose.model("Event", eventSchema)

module.exports = Event 