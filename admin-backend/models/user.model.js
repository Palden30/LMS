const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
    },
    googleId: String,
    facebookId: String,
    lastGithubPushDate: Date,
    githubId: String,
    githubAccessTokenHash: String,
    profilePicture: String,
    username: String,
    //any either google or facebook
    refreshToken: String,
    resetPin: String,
    resetPinExpiration: Date,

    // followers: [{ type: ObjectId, ref: 'User' }],
    // following: [{ type: ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('User', userSchema);
