const Brand = require("../Models/Brand")
const fs = require("fs")

async function createBrand(req, res) {
    try {
        let data = new Brand(req.body)
        if (req.file) {
            data.brandlogo = req.file.filename
        }
        await data.save()
        res.send({ result: "Done", message: "Record is Created", data: data })
    } catch (error) {
        console.log(error);
        if (error.keyValue)
            res.status(400).send({ result: "Fail", message: "Name Must Be Unique" })
        else if (error.errors.name)
            res.status(400).send({ result: "Fail", message: error.errors.name.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}

async function getAllBrand(req, res) {
    try {
        let data = await Brand.find().sort({ "_id": -1 })
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function getSingleBrand(req, res) {
    try {
        let data = await Brand.findOne({ _id: req.params._id })
        if (data)
            res.send({ result: "Done", data: data })
        else
            res.send({ result: "Fail", message: "Record not Found" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}


async function updateBrand(req, res) {
    try {
        let data = await Brand.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            if (req.file) {
                try {
                    fs.unlinkSync("public/brands/" + data.brandlogo)
                } catch (error) { }
                data.brandlogo = req.file.filename
            }
            await data.save()
            res.send({ result: "Done", message: "Record is Updated" })
        }
        else
            res.send({ result: "Fail", message: "Record not Found" })
    } catch (error) {
        if (error.keyValue)
            res.status(400).send({ result: "Fail", message: "Name Must Be Unique" })
        else if (error.errors.name)
            res.status(400).send({ result: "Fail", message: error.errors.name.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function deleteBrand(req, res) {
    try {
        let data = await Brand.findOne({ _id: req.params._id })
        if (data) {
            try {
                fs.unlinkSync("public/brands/" + data.brandlogo)
            } catch (error) { }
            await data.deleteOne()
            res.send({ result: "Done", message: "Record is Deleted" })
        }
        else
            res.send({ result: "Fail", message: "Record not Found" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}

module.exports = [createBrand, getAllBrand, getSingleBrand, updateBrand, deleteBrand]