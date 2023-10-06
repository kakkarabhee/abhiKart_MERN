const mongoose = require("mongoose")

const NewsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "E-mail can't be Blank!!"],
        unique: true
    }
})
const Newsletter = new mongoose.model("Newsletter", NewsletterSchema)
module.exports = Newsletter