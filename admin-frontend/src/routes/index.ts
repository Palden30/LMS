import { lazy } from "react";

const CreateCourse = lazy(() => import("../pages/Courses/CreateCourse"));
const CourseMedia = lazy(() => import("../pages/Courses/CourseMedia"));
const CourseCurriculum = lazy(() => import("../pages/Courses/ViewCourse"));
const EditCourse = lazy(() => import("../pages/Courses/EditCourse"));
const EditCourseContent = lazy(
  () => import("../pages/Courses/Contents/EditCourseContent")
);

const coreRoutes = [
  {
    path: "/create-course",
    title: "CreateCourse",
    component: CreateCourse,
  },
  {
    path: "/course-media",
    title: "CourseMedia",
    component: CourseMedia,
  },
  {
    path: "/course-view",
    title: "CourseCurriculum",
    component: CourseCurriculum,
  },
  {
    path: "/course-edit/:courseId",
    title: "EditCourse",
    component: EditCourse,
  },
  {
    path: "/course-content/:courseId",
    title: "EditCourseContent",
    component: EditCourseContent,
  },
];

const routes = [...coreRoutes];
export default routes;
