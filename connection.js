const mongoose = require("mongoose");


function establishConnectionWithMongo(connectionString) {
    return mongoose.connect(connectionString)
        .then(() => { console.log("Connection established successfully"); })
        .catch((err) => { console.log("Some error occurred while connecting to mongodb", err); })
}



module.exports={
    establishConnectionWithMongo
}