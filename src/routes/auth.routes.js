const { Router } = require("express");
const authController = require("../conrtollers/auth.controller");

const authRouter = Router();

authRouter.post("/register",authController.REGISTER);
authRouter.post("/login",authController.LOGIN)

module.exports = authRouter;