const categoryModel = require('../models/category.model');

const getCategory = (req, res, next) => {
    categoryModel
        .find({})
        .then((categories) => {
            return res.json({
                categories,
            });
        })
        .catch((err) =>
            res.status(400).json({
                error: 'Error fetching all categories!',
            })
        );
};

const addCategory = (req, res, next) => {
    const { categoryName } = req.body;
    new categoryModel({
        categoryName,
    })
        .save()
        .then((savedCategory) => {
            return res.status(201).json({
                message: 'Category added!',
                savedCategory
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ error: 'Error adding category!' });
        });
};

const deleteCategory = (req, res, next) => {
    const { id } = req.params;

    categoryModel
        .findByIdAndDelete(id)
        .then((deletedCategory) => {
            return res.status(202).json({
                message: 'Category Deleted!',
                deletedCategory
            });
        })
        .catch((err) =>
            res.status(400).json({
                error: 'Error deleting category!',
            })
        );
};


module.exports = {
    getCategory,
    addCategory,
    deleteCategory,
};
