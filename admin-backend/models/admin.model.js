const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
    },
    passwordHash: {
        required: true,
        type: String,
    },
});

module.exports = new mongoose.model('Admin', adminSchema);
