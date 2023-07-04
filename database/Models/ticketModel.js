const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, ' Product title required']
    },
    description: {
        type: String,
        required: [true, ' Product description required']
    },
    contact: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: "ticket"
    },
    createdby: {
        type: String,
        required: [true, "Email required tocreate product"]
    }
}, {
    expires: 2592000
})

const ticketModel = mongoose.model('ticket', ticketSchema)

module.exports = ticketModel