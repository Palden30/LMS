const mongoose = require('mongoose');

const enrolledUserSchema = mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    enrolled_Date: String,
    completed_date: String,
    isCompleted: { type: Boolean, default: false },
    progress: { type: Number, default: 0 },
    lessonProgress: [
        {
            lessonId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'learnLesson',
                required: true,
            },
            progress: { type: Number, default: 0 },
            checked: { type: Boolean, default: false },
        },
    ],
    chapterProgress: [
        {
            chapterId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'learnChapter',
                required: true,
            },
            progress: { type: Number, default: 0 },
            isFree: { type: Boolean, default: false },
            checked: { type: Boolean, default: false },
        },
    ],
    quizProgress: [
        {
            chapterId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'learnChapter',
                required: true,
            },
            completedQuiz: [
                {
                    quizId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'quiz',
                        required: true,
                    },
                    isCompleted: { type: Boolean, default: false },
                    isCorrect: { type: Boolean, default: false },
                },
            ],
            // progress: { type: Number, default: 0 },
            CorrectQuizzes: { type: Number, default: 0 },
            TotalQuiz: Number,
        },
    ],
});

module.exports = mongoose.model('EnrolledUser', enrolledUserSchema);
