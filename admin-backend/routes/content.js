const router = require('express').Router();
const content = require('../models/Content');
const tokenAuth = require('../Verification/tokenAuth');

router.post('/addContent', tokenAuth, async (req, res) => {
    const { no, title, code, category, explanation, flowchart } = req.body;
    const newContent = new content({
        no,
        title,
        code,
        category,
        explanation,
        flowchart,
    });
    try {
        const savedContent = await newContent.save();
        res.json({ content: savedContent });
    } catch (err) {
        res.json({ err });
    }
});

router.delete('/deleteContent/:contentId', tokenAuth, (req, res) => {
    if (req.body.userId === req.params.contentId || req.body.isAdmin) {
        content
            .findByIdAndDelete(req.params.contentId)
            .then((result) => {
                res.json({ result });
            })
            .catch((err) => {
                res.json({ err });
            });
    }
});

//update Content
router.put('/EditContent', tokenAuth, (req, res) => {
    content
        .findByIdAndUpdate(
            req.body.contentId,
            {
                $set: {
                    no: req.body.no,
                    title: req.body.title,
                    code: req.body.code,
                    category: req.body.category,
                    explanation: req.body.explanation,
                    flowchart: req.body.flowchart,
                },
            },
            {
                new: true,
            }
        )
        .then((result) => {
            res.json({ content: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get('/getAllContent', (req, res) => {
    content
        .find()
        .then((result) => {
            res.json({ content: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get('/getContent/:contentId', (req, res) => {
    content
        .findById(req.params.contentId)
        .then((result) => {
            res.json({ content: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;

//get content by category
router.get('/getContentByCategory/:category', (req, res) => {
    content
        .find({ category: req.params.category })
        .then((result) => {
            res.json({ content: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

//get content by title
router.get('/getContentByTitle/:title', (req, res) => {
    content
        .find({ title: req.params.title })
        .then((result) => {
            res.json({ content: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

//get content by code language
router.get('/getContentByCode/:code', (req, res) => {
    content
        .find({ code: req.params.code })
        .then((result) => {
            res.json({ content: result });
        })
        .catch((err) => {
            console.log(err);
        });
});
