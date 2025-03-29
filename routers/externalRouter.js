const express = require("express");
const externalRouter = express.Router();
const { handleExternalAbout, handleExternalContact,ping } = require("../controllers/intextController");

externalRouter.route("/contact").get(handleExternalContact);
externalRouter.route("/about").get(handleExternalAbout);
externalRouter.route("/ping").get(ping);

module.exports = {
    externalRouter
}