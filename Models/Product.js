const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name can't be Blank!!"],
    },
    maincategory: {
        type: String,
        required: [true, "maincategory can't be Blank!!"],
    },
    subcategory: {
        type: String,
        required: [true, "subcategory can't be Blank!!"],
    },
    brand: {
        type: String,
        required: [true, "brand can't be Blank!!"],
    },
    color: {
        type: String,
        required: [true, "color can't be Blank!!"],
    },
    size: {
        type: String,
        required: [true, "size can't be Blank!!"],
    },
    baseprice: {
        type: Number,
        required: [true, "baseprice can't be Blank!!"],
    },
    discount: {
        type: Number,
        default:0
    },
    finalprice: {
        type: Number,
        required: [true, "finalprice can't be Blank!!"],
    },
    stock: {
        type: String,
        default: "In Stock"
    },
    description: {
        type: String,
        default:"This is a sample product"
    },
    pic1: {
        type: String,
        required: [true, "Pic1 can't be Blank!!"],
    },
    pic2: {
        type: String,
        default:""
    },
    pic3: {
        type: String,
        default:""
    },
    pic4: {
        type: String,
        default:""
    }
})


const Product = new mongoose.model("Product", ProductSchema)
module.exports = Product