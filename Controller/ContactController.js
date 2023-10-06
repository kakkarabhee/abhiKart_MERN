const Contact = require("../Models/Contact")

async function createContact(req, res) {
    try {
        var data = new Contact(req.body)
        await data.save()
        res.send({ result: "Done", message: "Record is Created!!!!", data: data })
    } catch (error) {
        if (error.errors.name)
            res.send({ result: "Fail", message: error.errors.name.message })
        else if (error.errors.email)
            res.send({ result: "Fail", message: error.errors.email.message })
        else if (error.errors.phone)
            res.send({ result: "Fail", message: error.errors.phone.message })
        else if (error.errors.subject)
            res.send({ result: "Fail", message: error.errors.subject.message })
        else if (error.errors.message)
            res.send({ result: "Fail", message: error.errors.message.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}

async function getAllContact(req, res) {
    try {
        var data = await Contact.find().sort({ _id: -1 })
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function getSingleContact(req, res) {
    try {
        var data = await Contact.findOne({ _id: req.params._id })
        if (data)
            res.send({ result: "Done", count: data.length, data: data })
        else
            res.send({ result: "Fail", message: "Invalid Id!!!!" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}


async function updateContact(req, res) {
    try {
        var data = await Contact.findOne({ _id: req.params._id })
        if (data) {
            data.status = req.body.status ?? req.body
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


async function deleteContact(req, res) {
    try {
        var data = await Contact.deleteOne({ _id: req.params._id })
        if (data) {
            data.status = req.body.status ?? data.status
            res.send({ result: "Done", message: "Record Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}

module.exports = [createContact, getAllContact, getSingleContact, updateContact, deleteContact]