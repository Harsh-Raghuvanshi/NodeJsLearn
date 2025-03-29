const express = require("express");
const router = express.Router();
const { handleCreateUser, handleDeleteSingleUser, handleFetchAllUser, handleFetchSingleUser, handleUpdateSingleUser } = require("../controllers/userController");

router.route("/")
    .get(handleFetchAllUser)
    .post(handleCreateUser);

router.route("/:id")
    .get(handleFetchSingleUser)
    .patch(handleUpdateSingleUser)
    .delete(handleDeleteSingleUser)


module.exports = {
    router
}
