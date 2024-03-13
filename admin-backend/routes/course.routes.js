const express = require('express');
const courseRouter = express.Router();
const courseController = require('../controllers/Course/course.controller');

const {
    verifyToken,
    tokenExtractor,
    adminScope,
} = require('../middleware/tokenAuth');

courseRouter
    .route('/course')
    .get(courseController.getCourse)
    .post(tokenExtractor, verifyToken, adminScope, courseController.createCourse);

courseRouter
    .route('/course/:id')
    .get(courseController.getCourseById)
    .put(courseController.updateCourse)
    .delete(courseController.deleteCourse);

courseRouter.post(
    '/course/:id/content',
    tokenExtractor,
    verifyToken,
    adminScope,
    courseController.addCourseContent
)
courseRouter.post(
    '/course/:id/contents',
    tokenExtractor,
    verifyToken,
    adminScope,
    courseController.addCourseContents
)


//enroll User
courseRouter
    .route('/course/:id/enroll')
    .post(tokenExtractor, verifyToken, courseController.enrollCourse)
    .delete(tokenExtractor, verifyToken, courseController.unenrollCourse)
    .get(tokenExtractor, adminScope, courseController.getEnrollUsers);

courseRouter
    .route('/enroll/user/courses')
    .get(tokenExtractor, verifyToken, courseController.getEnrollUser);

courseRouter
    .route('/course/:id/enroll/user/check')
    .get(tokenExtractor, verifyToken, courseController.checkEnrollUserByCourse);


module.exports = courseRouter;
