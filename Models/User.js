const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name can't be Blank!!"]
    },
    username: {
        type: String,
        required: [true, "UserName can't be Blank!!"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email can't be Blank!!"]
    },
    phone: {
        type: String,
        required: [true, "Phone can't be Blank!!"]
    },
    password: {
        type: String,
        required: [true, "Password can't be Blank!!"]
    },
    address: {
        type: String
    },
    pincode: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pic: {
        type: String
    },
    role: {
        type: String,
        default:"Buyer"
    },
    otp:{
        type:Number
    }
})
const User = new mongoose.model("User", UserSchema)
module.exports = User