const Maincategory = require("../Models/Maincategory")

async function createMaincategory(req, res) {
    try {
        var data = new Maincategory(req.body)
        await data.save()
        res.send({ result: "Done", message: "Record is Created!!!!", data: data })
    } catch (error) {
        console.log(error)
        if (error.keyValue)
            res.send({ result: "Fail", message: "User Already Exists" })
        else if (error.errors.name)
            res.send({ result: "Fail", message: error.errors.name.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}

async function getAllMaincategory(req, res) {
    try {
        var data = await Maincategory.find().sort({ _id: -1 })
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function getSingleMaincategory(req, res) {
    try {
        var data = await Maincategory.findOne({ _id: req.params._id })
        if (data)
            res.send({ result: "Done", data: data })
        else
            res.send({ result: "Fail", message: "Invalid Id!!!!" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}


async function updateMaincategory(req, res) {
    try {
        var data = await Maincategory.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? req.body
            await data.save()
            res.send({ result: "Done", message: "Record Updated Successfully" })
        }
        else
            if (error.keyValue)
                res.send({ result: "Fail", message: "User Already Exists" })
            else
                res.send({ result: "Fail", message: "Invalid Id!!!!" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}


async function deleteMaincategory(req, res) {
    try {
        var data = await Maincategory.deleteOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? req.body
            res.send({ result: "Done", message: "Record Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}

module.exports = [createMaincategory, getAllMaincategory, getSingleMaincategory, updateMaincategory, deleteMaincategory]