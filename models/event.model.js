const mongoose = require("mongoose")
const Schema = mongoose.Schema

const saraoSchema = new Schema({
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
    userPlus:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    finished: Boolean,

    cssConcurrence: Number,
    cssOverlaps: Boolean

}, {
    timestamps: true
})

const Sarao = mongoose.model("Sarao", saraoSchema)

module.exports = Sarao 