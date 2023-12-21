const mongoose = require('mongoose')
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: {

        type: String,
        required: true,

    },
    email: {
        type: String,
        // unique: true,
        required: true,
    },
    countrycode: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true
    },
    other: {
        type: String,
       
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    },
}, {
    timestamps: true
});



userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
