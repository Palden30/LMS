const adminModel = require('../../models/admin.model');
const jwt = require('jsonwebtoken');
const { ACCESS_SECRET } = require('../../main.config');
const bcrypt = require('bcryptjs');

const register = (req, res, next) => {
    const { email, password } = req.body;
    let passwordHash;

    if (!email || !password) {
        return res.status(422).json({ error: 'please add email or password' });
    }

    adminModel.findOne({ email }).then((admin) => {
        if (admin)
            return res
                .status(403)
                .json({ error: 'Admin User already exists!' });

        bcrypt
            .hash(password, 10)
            .then((hash) => {
                passwordHash = hash;
                new adminModel({
                    email,
                    passwordHash,
                })
                    .save()
                    .then((savedAdmin) => {
                        return res.status(201).json({
                            message: 'Admin user created successfully!',
                            user: savedAdmin,
                        });
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    });
};

const login = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(403).json({ error: 'Invalid user credentials!' });
    }
    adminModel.findOne({ email: email }).then((admin) => {
        if (!admin) {
            return res.status(422).json({ error: 'Admin User not found!' });
        }
        bcrypt
            .compare(password, admin.passwordHash)
            .then((doMatch) => {
                if (doMatch) {
                    const token = jwt.sign(
                        { id: admin._id, role: 'admin' },
                        ACCESS_SECRET
                    );
                    res.status(201).json({
                        message: 'Logged In Successfully!',
                        token,
                    });
                } else {
                    return res.status(403).json({ error: 'Invalid password!' });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
};

module.exports = { login, register };
