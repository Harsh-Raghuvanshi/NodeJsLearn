const express = require("express");
const authRouter = express.Router();
const { handleUserSignIn, handleUserSignUp,handleUserSignInV2,handleGetRequestOnSignInV2,ping } = require("../controllers/authController");

authRouter.route("/signup").post(handleUserSignUp);
authRouter.route("/signin").post(handleUserSignIn);
authRouter.route("/v2/signin").post(handleUserSignInV2);
authRouter.route("/v2/signin").get(handleGetRequestOnSignInV2);
authRouter.route("/ping").get(ping);

module.exports={
    authRouter
}