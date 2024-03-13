const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const config = require('../main.config');

const postImage = (req, res, _next) => {
    if (!req.file) {
        res.status(400).json({ error: 'Invalid file Url' });
    }

    const image = `${config.HOST_URI}/api/file/image/${req.file.filename}`;

    res.status(200).json({
        bannerImageUrl: image,
    });
};

const getImage = (req, res, next) => {
    const { name: fileName } = req.params;
    const uploadsFolder = path.resolve(__dirname + '/../uploads');

    const files = fs
        .readdir(uploadsFolder)
        .then((files) => {
            const file = files.find((file) => file === fileName);

            if (!file) {
                return res.status(400).json({
                    error: 'File not found!',
                });
            }

            return res.sendFile(`${uploadsFolder}/${file}`);
        })
        .catch((err) => next(err));
};

module.exports = { getImage, postImage };
