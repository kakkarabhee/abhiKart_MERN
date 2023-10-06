const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name can't be Blank!!"],
    },
    email: {
        type: String,
        required: [true, "Email can't be Blank!!"],
    },
    phone: {
        type: String,
        required: [true, "Phone can't be Blank!!"],
    },
    subject: {
        type: String,
        required: [true, "Subject can't be Blank!!"],
    },
    message: {
        type: String,
        required: [true, "Message can't be Blank!!"],
    },
    status: {
        type: String,
        default:"Active"
    },
    date: {
        type: String,
    }
})
const Contact = new mongoose.model("Contact", ContactSchema)
module.exports = Contact