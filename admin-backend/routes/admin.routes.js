const adminRouter = require("express").Router();
const adminServices = require("../controllers/Admin/admin");
const validationMiddleware = require("../middleware/validation");
const { authSchema } = require("../zod_schemas/auth.validateSchema");

adminRouter.post(
  "/admin/login",
  validationMiddleware(authSchema),
  adminServices.login
);
adminRouter.post(
  "/admin/register",
  validationMiddleware(authSchema),
  adminServices.register
);

module.exports = adminRouter;
