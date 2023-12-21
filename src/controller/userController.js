const Ebook = require('../schema/productchema');
const mongoose = require('mongoose')
const userModel = require('../schema/userSchema')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const userControlle = async (req, res) => {
    // console.log('register api called');
    const { name, email, phoneNumber, password, countrycode, cpassword,other } = req.body
    console.log(req.body);
    // return false
    try {
        if (!name || !email || !phoneNumber || !password || !countrycode) {
            res.status(400).json({ error: "All fields required" })
            return
        } if (password !== cpassword) {
            res.status(400).json({ error: "Password and Confirm password are not same required" })
            return
        }

        const userData = new userModel({
            name, email, phoneNumber, password, countrycode,other
        }
        )
        const result = await userData.save()
        console.log(result);

        res.status(201).json({ message: "User Registered successfully", result })
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            const duplicateField = Object.keys(error.keyPattern)[0];
            if (duplicateField === 'email') {
                res.status(400).json({ error: 'Email address is already in use.' });
            } else if (duplicateField === 'phoneNumber') {
                res.status(400).json({ error: 'Phone number is already in use.' });
            } else {
                res.status(400).json({ error: 'Duplicate key error.' });
            }
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}
const privateKey = 'mynameismdatiqurRahmanIlikemygfZulekha'

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const userAvail = await userModel.findOne({ email: email })
        console.log(userAvail);
        if (userAvail) {
            const isValid = await bcrypt.compare(password, userAvail.password)
            if (isValid) {
                jwt.sign(userAvail.email, privateKey, function (err, token) {
                    if (err) {
                        res.status(401).json({ err: "Error while generating tokens" })
                    } else {
                        res.status(200).json({ msg: "Logged In Successfully", token })
                    }
                });

            } else {
                res.status(401).json({ err: "Invalid Credentials" })
            }
        } else {
            res.status(401).json({ err: "Invalid Credentials" })
        }

    } catch (err) {
        console.log(err);
    }


}



module.exports = { userControlle, login }


