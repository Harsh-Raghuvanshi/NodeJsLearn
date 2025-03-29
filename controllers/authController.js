const { signUpModel } = require("../models/authModel");
const { createTokenAndState } = require("../services/cacheService");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function handleUserSignUp(req, res) {
    const { fullName, college, email, password } = req.body;
    if (!fullName || !college || !email || !password) {
        return res.status(400).json({ message: "All fields are not present some are missing" });
    }
    const result = await signUpModel.create({
        fullName, college, email, password
    });
    return res.status(201).json({ message: "User signUpData created successfully" });
}


async function handleUserSignIn(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required for singIn" });
    }
    const user = await signUpModel.findOne({ "email": email });
    if (!user || user.password !== password) {
        return res.status(404).json({ message: "Invalid email or password" });
    }
    const token = createTokenAndState(user);
    console.log("token that we got for user is ", token);
    res.cookie("token", token);
    return res.status(200).json({ message: "You are successfully authenticated" });

}

async function handleUserSignInV2(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const user = await signUpModel.findOne({ "email": email });
    if (!user || user.password !== password) {
        return res.status(400).json({ message: "Invalid username or password" });
    }
    const secretKey = process.env.SECRET_KEY;
    const payload = {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
    };
    console.log("payload",payload,"user",user);
    const token = jwt.sign(payload, secretKey);
    console.log("generate token", token);

    return res.status(200).json({ message: "authenticated successfully generated token", jwtToken: token });

}

function handleGetRequestOnSignInV2(req, res) {
    return res.status(200).json({ message: "This is login form" });
}

function ping(req, res) {
    console.log("pinged ", req.url);
    return res.status(200).json({ message: "PONG" });
}


module.exports = {
    handleUserSignIn,
    handleUserSignUp,
    handleUserSignInV2,
    handleGetRequestOnSignInV2,
    ping
}
