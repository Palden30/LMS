const jwt = require('jsonwebtoken');
const { ACCESS_SECRET } = require('../main.config');

const tokenExtractor = (req, res, next) => {
    const token = req.get('authorization');

    if (!token) {
        return res.status(498).json({
            message: 'token not found!',
        });
    }

    req.token = token.substring(7);
    next();
};

const verifyAccesstoken = (req, res, next) => {
    try {
    } catch (e) {
        console.log(e);
        res.status(400).json({ su });
    }
};
const adminScope = (req, res, next) => {
    const { role } = jwt.verify(req.token, ACCESS_SECRET);

    if (role !== 'admin') {
        return res.status(401).json({
            message: 'Insufficient scope!',
        });
    }

    next();
};

const verifyToken = (req, res, next) => {
    let id;
    try {
        id = jwt.verify(req.token, ACCESS_SECRET);
        console.log(id);
    } catch (e) {
        return res.status(401).json({
            message: 'Invalid Token!',
        });
    }
    if (!id) {
        return res.status(401).json({
            message: 'Invalid Token!',
        });
    }
    req.user = { id };
    next();

};

module.exports = { tokenExtractor, adminScope, verifyToken };
