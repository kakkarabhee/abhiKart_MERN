const Newsletter = require("../Models/Newsletter")

async function createNewsletter(req, res) {
    try {
        var data = new Newsletter(req.body)
        await data.save()
        res.send({ result: "Done", message: "Thanks for your Subscription!!!!", data: data })
    } catch (error) {
        if (error.keyValue)
            res.send({ result: "Fail", message: "You are already Subscribed..." })
        else if (error.errors.email)
            res.send({ result: "Fail", message: error.errors.email.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}

async function getAllNewsletter(req, res) {
    try {
        var data = await Newsletter.find().sort({ _id: -1 })
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}



async function deleteNewsletter(req, res) {
    try {
        await Newsletter.deleteOne({ _id: req.params._id })
        res.send({ result: "Done", message: "Record Deleted Successfully" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}

module.exports = [createNewsletter, getAllNewsletter, deleteNewsletter]