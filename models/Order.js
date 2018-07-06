const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    quantity: {
        type: Number,
        default: 1
    },
    total: {
        type: Number,
        default: 65
    },
    hora: String,
    movie: {
        type: Schema.Types.ObjectId,
        ref: "Movie"
    },
    cinema: String
})

module.exports = mongoose.model('Order', orderSchema);