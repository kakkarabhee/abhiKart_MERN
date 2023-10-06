const User = require("../Models/User")
const fs = require("fs")
const bcrypt = require("bcrypt")
const passwordValidator = require('password-validator');
const jwt = require("jsonwebtoken")
const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    tls: true,
    auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD
    }
})

var schema = new passwordValidator();
schema
    .is().min(8)
    .is().max(100)
    .is().uppercase(1)
    .is().lowercase(1)
    .is().digits(1)
    .is().not().spaces()
    .is().not().oneOf(['Password', 'Admin@123', 'Password@123']);

async function createUser(req, res) {
    if (schema.validate(req.body.password)) {
        var data = new User(req.body)
        bcrypt.hash(req.body.password, 12, async (error, hash) => {
            if (error)
                res.send({ result: "Fail", error: error })
            else {
                try {
                    data.password = hash
                    await data.save()
                    res.send({ result: "Done", message: "Record is Created!!!", data: data })
                } catch (error) {
                    if (error.keyValue)
                        res.send({ result: "Fail", message: "User Name must be unique", error: error })
                    else if (error.errors.name)
                        res.send({ result: "Fail", message: error.errors.name.message })
                    else if (error.errors.username)
                        res.send({ result: "Fail", message: error.errors.username.message })
                    else if (error.errors.email)
                        res.send({ result: "Fail", message: error.errors.email.message })
                    else if (error.errors.phone)
                        res.send({ result: "Fail", message: error.errors.phone.message })
                    else if (error.errors.password)
                        res.send({ result: "Fail", message: error.errors.password.message })
                    else
                        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
                }
            }
        })
    }
    else
        res.send({ result: "Fail", message: "Password should contain uppercase, lowercase, digits and symbol" })
}
async function getAllUser(req, res) {
    try {
        var data = await User.find().sort({ _id: -1 })
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function getSingleUser(req, res) {
    try {
        var data = await User.findOne({ _id: req.params._id })
        if (data)
            res.send({ result: "Done", count: data.length, data: data })
        else
            res.send({ result: "Fail", message: "Invalid Id!!!!" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}



async function updateUser(req, res) {
    try {
        var data = await User.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.email = req.body.email ?? data.email
            data.phone = req.body.phone ?? data.phone
            data.address = req.body.address ?? data.address
            data.pincode = req.body.pincode ?? data.pincode
            data.city = req.body.city ?? data.city
            data.state = req.body.state ?? data.state

            try {
                if (req.file.filename && data.pic)
                    fs.unlinkSync("public/users/" + data.pic)

                data.pic = req.file.filename
            } catch (error) { }
            await data.save()
            res.send({ result: "Done", message: "Record Updated Successfully" })
        }
        else
            if (error.keyValue)
                res.send({ result: "Fail", message: "User Already Exists" })
            else
                res.send({ result: "Fail", message: "Invalid Id!!!!" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}


async function deleteUser(req, res) {
    try {
        var data = await User.deleteOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? req.body
            res.send({ result: "Done", message: "Record Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}

async function login(req, res) {
    try {
        var data = await User.findOne({ username: req.body.username })
        if (data) {
            if (await bcrypt.compare(req.body.password, data.password)) {
                let key = data.role === "Buyer" ? process.env.JWT_BUYER_KEY : process.env.JWT_ADMIN_KEY
                jwt.sign({ data }, key, (error, token) => {
                    if (error)
                        res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
                    else
                        res.send({ result: "Done", data: data, token: token })
                })
            }

            else
                res.send({ result: "Fail", message: "Invalid Username or Password" })

        }
        else
            res.send({ result: "Fail", message: "Invalid Username or Password" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server error", error: error })

    }
}

async function forgetPassword1(req, res) {
    try {
        var data = await User.findOne({ username: req.body.username })
        if (data) {
            var otp = parseInt(Math.random() * 1000000)
            res.send({ result: "Done", message: "OTP sent.. PLease check your registered Email!!!" })
            data.otp = otp
            data.save()

            const mailOptions = {
                from: process.env.EMAIL_SENDER,
                to: data.email,
                subject: "Reset Password!!! :AbhiKart",
                text: `
                    OTP to reset your Password is ${otp}
                    Team : AbhiKart
                `
            }
            transporter.sendMail(mailOptions, (error) => {
                console.log(error)
            })
        }
        else
            res.send({ result: "Fail", message: "Username Not Found" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
}

async function forgetPassword2(req, res) {
    try {
        var data = await User.findOne({ username: req.body.username })
        if (data) {
            if (data.otp == req.body.otp)
                res.send({ result: "Done", message: "OTP Verified!!!" })
            else
                res.send({ result: "Fail", message: "Invalid OTP" })
        }
        else
            res.send({ result: "Fail", message: "Unauthorized Activity" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
}

async function forgetPassword3(req, res) {
    try {
        var data = await User.findOne({ username: req.body.username })
        if (data) {
            if (schema.validate(req.body.password)) {
                bcrypt.hash(req.body.password, 12, async (error, hash) => {
                    if (error)
                        res.send({ result: "Fail", error: error })
                    else {
                        data.password = hash
                        await data.save()
                        res.send({ result: "Done", message: "Password is Updated!!!"})
                    }
                })
            }
            else
                res.send({ result: "Fail", message: "Password should contain uppercase, lowercase, digits and symbol" })
        }
        else
            res.send({ result: "Fail", message: "Unauthorized Activity" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
}

module.exports = [createUser, getAllUser, getSingleUser, updateUser, deleteUser, login, forgetPassword1, forgetPassword2, forgetPassword3]