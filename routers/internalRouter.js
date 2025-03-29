const express = require("express");
const internalRouter = express.Router();
const { handleInternalHome, handleInternalWork,ping } = require("../controllers/intextController");

internalRouter.route("/home").get(handleInternalHome);
internalRouter.route("/work").get(handleInternalWork);
internalRouter.route("/ping").get(ping);

module.exports = {
    internalRouter
}