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
        default: 'https://vignette.wikia.nocookie.net/rickandmorty/images/e/e3/S1e10_jerry_in_ricks_room.png/revision/latest/scale-to-width-down/220?cb=20160911024947'
    },
    description: String,
    startDate: { type: Date, required: true, default: new Date },
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
    finished: Boolean,

    cssConcurrence: Number,
    cssOverlaps: Boolean

}, {
    timestamps: true
})

const Event = mongoose.model("Event", eventSchema)

module.exports = Event 