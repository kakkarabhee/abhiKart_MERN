const Checkout = require("../Models/Checkout")

async function createCheckout(req, res) {
    try {
        var data = new Checkout(req.body)
        await data.save()
        data.date = new Date()
        res.send({ result: "Done", message: "Record is Created!!!!", data: data })
    } catch (error) {
        if (error.errors.userid)
            res.send({ result: "Fail", message: error.errors.userid.message })
        else if (error.errors.subtotal)
            res.send({ result: "Fail", message: error.errors.subtotal.message })
        else if (error.errors.total)
            res.send({ result: "Fail", message: error.errors.total.message })
        else if (error.errors.shipping)
            res.send({ result: "Fail", message: error.errors.shipping.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}

async function getAllCheckout(req, res) {
    try {
        var data = await Checkout.find().sort({ _id: -1 })
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function getUserAllCheckout(req, res) {
    try {
        var data = await Checkout.find({ userid: req.params.userid }).sort({ _id: -1 })
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function getSingleCheckout(req, res) {
    try {
        var data = await Checkout.findOne({ _id: req.params._id })
        if (data)
            res.send({ result: "Done", count: data.length, data: data })
        else
            res.send({ result: "Fail", message: "Invalid Id!!!!" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}


async function updateCheckout(req, res) {
    try {
        var data = await Checkout.findOne({ _id: req.params._id })
        if (data) {
            data.paymentmode = req.body.paymentmode ?? data.paymentmode
            data.paymentstatus = req.body.paymentstatus ?? data.paymentstatus
            data.orderstatus = req.body.orderstatus ?? data.orderstatus
            data.rppid = req.body.rppid ?? data.rppid
            await data.save()
            res.send({ result: "Done", message: "Record Updated Successfully" })
        }
        else
            if (error.keyValue)
                res.send({ result: "Fail", message: "User Already Exists" })
            else
                res.send({ result: "Fail", message: "Invalid Id!!!!" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error", error: error })
    }
}


async function deleteCheckout(req, res) {
    try {
        var data = await Checkout.deleteOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? req.body
            res.send({ result: "Done", message: "Record Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}

module.exports = [createCheckout,  getAllCheckout, getUserAllCheckout, getSingleCheckout, updateCheckout, deleteCheckout]