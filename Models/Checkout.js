const mongoose = require("mongoose")

const CheckoutSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: [true, "Userid can't be Blank!!"]
    },
    username: {
        type: String,
        required: [true, "Username can't be Blank!!"]
    },
    paymentmode: {
        type: String,
        default: "COD"
    },
    paymentstatus: {
        type: String,
        default: "pending"
    },
    orderstatus: {
        type: String,
        default: "Order Placed"
    },
    subtotal: {
        type: Number,
        required: [true, "Subtotal can't be Blank!!"]
    },
    shipping: {
        type: Number,
        required: [true, "Shipping can't be Blank!!"]
    },
    total: {
        type: Number,
        required: [true, "total can't be Blank!!"]
    },
    rppid: {
        type: String,
        default:""
    }, 
    date: {
        type: String,
    },
    products: [
        {
            name: {
                type: String
            },
            brand: {
                type: String
            },
            color: {
                type: String
            },
            size: {
                type: String
            },
            price: {
                type: Number
            },
            qty: {
                type: Number,
                default: 1
            },
            total: {
                type: Number
            },
            pic: {
                type: String,
            }
        }
    ]

})
const Checkout = new mongoose.model("Checkout", CheckoutSchema)
module.exports = Checkout