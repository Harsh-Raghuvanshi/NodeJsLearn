const {v4:uuidv4}=require("uuid");
let tokenToUserMap=new Map();

function createTokenAndState(user){
    console.log("createTokeAndState user value is ",user);
    const token=uuidv4();
    tokenToUserMap.set(token,user._id);
    return token;
}

function findUserForToken(token){
    console.log("recieved token",token);
    const userId=tokenToUserMap.get(token);
    return userId;

}

module.exports={
    findUserForToken,
    createTokenAndState
}