const router = require('express').Router();
const commonServices = require('../controllers/common.controller');

router.delete('/category/:id', commonServices.deleteCategory);
router
    .route('/category')
    .get(commonServices.getCategory)
    .post(commonServices.addCategory);

module.exports = router;
