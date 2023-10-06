const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: [true, "Userid can't be Blank!!"]
    },
    productid: {
        type: String,
        required: [true, "Productid can't be Blank!!"]
    },
    name: {
        type: String,
        required: [true, "Cart can't be Blank!!"]
    },
    brand: {
        type: String,
        required: [true, "Brand can't be Blank!!"]
    },
    color: {
        type: String,
        required: [true, "Color can't be Blank!!"]
    },
    size: {
        type: String,
        required: [true, "Size can't be Blank!!"]
    },
    price: {
        type: Number,
        required: [true, "Price can't be Blank!!"]
    },
    qty: {
        type: Number,
        default:1
    },
    total: {
        type: Number,
        required: [true, "Total can't be Blank!!"]
    },
    pic: {
        type: String,
    }
})
const Cart = new mongoose.model("Cart", CartSchema)
module.exports = Cart