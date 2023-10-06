const mongoose = require("mongoose")

const MaincategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name can't be Blank!!"],
        unique:true
    }
})
const Maincategory = new mongoose.model("Maincategory",MaincategorySchema)
module.exports = Maincategory