const mongoose = require('mongoose');

const accountShema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
    },
    groupName: {
        type: String,
    },
    orderDate: {
        type: String,
    },
    expiredDate: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: String,
        required: true,
    },
    status: {
        type: String,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: true,
    }
});

const Account = mongoose.model("Account", accountShema);

module.exports = {
    Account,
};