const mongoose = require("mongoose");


// Declaring schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    }
});

// Creating an interface for crud operations
const User = mongoose.model("user", userSchema);

module.exports={
    User
}
