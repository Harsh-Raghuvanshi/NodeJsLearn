const {User} = require("../models/userModel");

async function handleCreateUser(req, res) {
    const userInfo = req.body;
    console.log("userInfo ", userInfo);

    if (!userInfo.firstName || !userInfo.email || !userInfo.college) {
        return res.status(400).json({ message: "Some field is missing" });
    }

    const result = await User.create({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        college: userInfo.college
    })

    console.log("result ", result);
    return res.status(201).json({ message: "User created successfully" });
}


async function handleFetchAllUser(req, res) {
    const allUsers = await User.find({});
    console.log("Number of users fetched from db ", allUsers.length);
    return res.status(200).json(allUsers);
}

async function handleFetchSingleUser(req, res) {
    const userId = req.params.id;
    const fetchedUser = await User.findById(userId);
    console.log("fetchedUser", fetchedUser);
    return res.status(200).json(fetchedUser);
}

async function handleUpdateSingleUser(req, res) {
    const userId = req.params.id;
    const newBody = req.body;
    const result = await User.findByIdAndUpdate(userId, newBody);
    console.log("updation result", result);
    return res.status(200).json({ message: "Updated successfully" });

}

async function handleDeleteSingleUser(req, res) {
    const userId = req.params.id;
    const result = await User.findByIdAndDelete(userId);
    console.log("deletion result", result);
    return res.status(200).json({ message: "User deleted Successfully" });
}


module.exports={
    handleCreateUser,
    handleDeleteSingleUser,
    handleFetchAllUser,
    handleFetchSingleUser,
    handleUpdateSingleUser
}