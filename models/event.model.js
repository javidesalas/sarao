const mongoose = require("mongoose")
const Schema = mongoose.Schema

const eventSchema = new Schema({
    name: { type: String, required: true},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sarao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sarao'
    },
    image: String,
    description: String,
    startDate: { type: Date, required: true, default: new Date},
    duration: Number, //default 60 minutes
    location: String,
    karmaPlus: {type: Number, min:0},
    karmaMinus: {type: Number, max:0},
    userPlus:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    userMinus:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    finished: { type: Boolean, default: false}

    cssConcurrence: Number,
    cssOverlaps: Boolean

}, {
    timestamps: true
})

const Event = mongoose.model("Event", eventSchema)

module.exports = Event 