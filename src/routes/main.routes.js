const { Router } = require("express");
const authRouter = require("./auth.routes");
const postRouter = require("./post.router");

const mainRouter = Router();

mainRouter.use("/auth",authRouter);
mainRouter.use("/posts",postRouter);
module.exports = mainRouter