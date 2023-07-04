const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, ' Product title required']
    },
    description: {
        type: String,
        required: [true, ' Product description required']
    },
    createdby: {
        type: String,
        required: [true, "Email required tocreate product"]
    },
    category: {
        type: String,
        default: "product"
    },
    image: String,
    contact: {
        type: String,
        required: true
    }
}, {
    expires: 2592000
})

const productModel = mongoose.model('product', productSchema)
module.exports = productModel