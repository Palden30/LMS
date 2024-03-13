const router = require('express').Router();
const {
    createCategory,
    updateCategory,
    getCategory,
    getAllCategory,
    deleteCategory,
} = require('../controllers/Course/courseCategory.controller');

router.post('/coursesCategory/category',createCategory);
router.get('/coursesCategory/category', getAllCategory);
router.get('/coursesCategory/category/:id', getCategory);
router.put('/coursesCategory/category/:id', updateCategory);
router.delete('/coursesCategory/category/:id', deleteCategory);

module.exports = router;
