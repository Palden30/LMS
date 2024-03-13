const courseModel = require('../../models/entities/course.model');
const customError = require('../../error/CustomAPIError');
const EnrolledUser = require('../../models/entities/enrolledUser.model');
const { StatusCodes } = require('http-status-codes');

const createCourse = (req, res, next) => {
    const { body } = req;
    console.log(body);
    new courseModel({
        ...body,
    })
        .save()
        .then((savedCourse) => {
            return res.status(201).json({
                savedCourse,
                message: 'Course added successfully!',
            });
        })
        .catch((err) => next(err));
};

const getCourse = (req, res, next) => {
    const {
        category,
        search: courseName,
        hadDiscount,
        language,
        minPrice,
        maxPrice,
    } = req.query;

    const filters = {};

    if (category) {
        filters.category = category;
    }

    if (courseName) {
        filters.courseName = { $regex: new RegExp(courseName, 'i') };
    }

    if (hadDiscount) {
        filters.hadDiscount = hadDiscount;
    }

    if (language) {
        filters.language = language;
    }

    if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) {
            filters.price.$gte = minPrice;
        }
        if (maxPrice) {
            filters.price.$lte = maxPrice;
        }
    }
    console.log(filters);

    courseModel
        .find(filters)
        .then((allCourse) =>
            res.json({
                allCourse,
            })
        )
        .catch((err) => next(err));
};

const addCourseContent = async (req,res) => {
    const { id: courseId } = req.params;
    const course = await courseModel.findById(courseId);
    if (!course) {
        throw new customError(`No course with id: ${courseId}`, 404);
    }
    
    const updatedCourse = await courseModel.findByIdAndUpdate(courseId, {
        $push: {
            content: {
                ...req.body
            },
        },
    });

    return res.status(StatusCodes.OK).json({message:"Successfully added course content!", updatedCourse})
}

const addCourseContents = async (req,res) => {
    const { id: courseId } = req.params;
    const course = await courseModel.findById(courseId);
    if (!course) {
        throw new customError(`No course with id: ${courseId}`, 404);
    }

    const updatedCourse = await courseModel.findByIdAndUpdate(courseId, {
        $push: {
            content: {
                $each: req.body.contents
            },
        },
    });

    return res.status(StatusCodes.OK).json({message:"Successfully added course content!", updatedCourse})
}

const getCourseById = (req, res, next) => {
    const { id } = req.params;

    courseModel
        .findById(id)
        .then((foundCourse) => {
            res.json({
                foundCourse,
            });
        })
        .catch((err) => next(err));
};

const updateCourse = (req, res, next) => {
    const {
        params: { id },
        body,
    } = req;

    courseModel
        .findById(id)
        .then((course) => {
            if (!course) {
                return res.status(404).json({
                    message: 'Course not found!',
                });
            }
            Object.keys(body).forEach((key) => {
                course[key] = body[key];
            });
            return course.save();
        })
        .then((updatedCourse) => {
            return res.status(200).json({
                message: 'Course updated successfully!',
                updatedCourse,
            });
        })
        .catch((err) => next(err));
};

const deleteCourse = (req, res, next) => {
    const { id: courseId } = req.params;

    courseModel
        .findByIdAndDelete(courseId)
        .then((deletedCourse) => {
            return res.status(204).json({
                message: 'course deleted!',
                deletedCourse,
            });
        })
        .catch((err) => next(err));
};

const enrollCourse = async (req, res) => {
    const { id: courseId } = req.params;
    const { id: userId } = req.user;

    try {
        const course = await courseModel.findById(courseId);
        if (!course) {
            throw new customError(`No course with id: ${courseId}`, 404);
        }

        // Check if user has already enrolled in that particular course
        const isEnrolled = await EnrolledUser.findOne({ courseId, userId });
        if (isEnrolled) {
            throw new customError(
                'You have already enrolled in this course',
                400
            );
        }

        // Create a new enrolled user object
        const enrolled = new EnrolledUser({
            courseId,
            userId,
            enrolled_Date: new Date().toLocaleDateString(),
            completed_date: null,
            isCompleted: false,
            progress: 0,
        });

        await enrolled.save();
        await enrolled.populate('courseId');

        res.status(201).json({
            message: 'You have successfully enrolled in this course',
            enrolled,
        });
    } catch (error) {
        console.log(error);
        throw new customError(error.message, 500);
    }
};

const unenrollCourse = async (req, res) => {
    const { id: courseId } = req.params;
    const { id: userId } = req.user;

    try {
        const course = await courseModel.findById(courseId);
        if (!course) {
            throw new customError(`No course with id: ${courseId}`, 404);
        }

        // Check if user has already enrolled in that particular course
        const isEnrolled = await EnrolledUser.findOne({ courseId, userId });
        if (isEnrolled) {
            await EnrolledUser.findOneAndDelete({ courseId, userId });
        }

        res.status(StatusCodes.OK).json({
            message: 'You have successfully unenrolled in this course',
        });
    } catch (error) {
        console.log(error);
        throw new customError(error.message, 500);
    }
};

const getEnrollUsers = async (req, res) => {
    const { id: courseId } = req.params;
    const enrollUsers = await EnrolledUser.find({ courseId });
    if (!enrollCourse.length) {
        throw new customError('No Enroll user found!!!', StatusCodes.NOT_FOUND);
    }
    res.status(200).json({ msg: 'Fetched successfully', enrollUsers });
};

const getEnrollUser = async (req, res) => {
    const enrollUser = await EnrolledUser.find({
        userId: req.user.id,
    });
    if (enrollUser.length === 0) {
        throw new customError(
            `you have not enroll to any courses yet!!!`,
            StatusCodes.NOT_FOUND
        );
    }
    res.status(200).json({ msg: 'Fetched successfully', enrollUser });
};

const checkEnrollUserByCourse = async (req, res) => {
    const enrollUser = await EnrolledUser.find({
        userId: req.user.id,
        courseId: req.params.id,
    });
    if (enrollUser.length === 0) {
        throw new customError(
            `you have not enroll to this course yet!!!`,
            StatusCodes.NOT_FOUND
        );
    }
    res.status(200).json({
        status: true,
        msg: 'You have enrolled in this course',
        data: enrollUser,
    });
};


module.exports = {
    deleteCourse,
    createCourse,
    getCourse,
    getCourseById,
    updateCourse,
    enrollCourse,
    unenrollCourse,
    getEnrollUser,
    getEnrollUsers,
    checkEnrollUserByCourse,
    addCourseContent,
    addCourseContents,
};
