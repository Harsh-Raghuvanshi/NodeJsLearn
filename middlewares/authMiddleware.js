
const {findUserForToken}=require("../services/cacheService");
const {signUpModel}=require("../models/authModel");
const jwt=require("jsonwebtoken");
require("dotenv").config();

async function checkUserLoggedInCookie(req,res,next){
    const token=req.cookies.token;
    console.log("Token is ",token,"and cookies object is ",req.cookies);
    if(token){
        const userId=findUserForToken(token);
        const user=await signUpModel.findById(userId);
        console.log("User we got ",user);
        if(!user){
            return res.redirect("http://localhost:8000/api/external/about");
        }
        req.x_user=user;
    }else{
        return res.redirect("http://localhost:8000/api/external/about");
    }
    next();
}

async function checkUserLoggedInHeader(req,res,next){
    console.log("headers",req.headers);
    const authorizationHeaderValue=req.headers["authorization"];
    if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer ")){
        return next();
    }
    const tokenArray=authorizationHeaderValue.split("Bearer ");
    console.log("tokenArray",tokenArray);
    if(tokenArray.length<2){
        return next();
    }
    const token=tokenArray[1];
    const secretKey = process.env.SECRET_KEY;
    let fetchedData="";

    try{
        fetchedData=jwt.verify(token,secretKey);
    }catch(error){
        console.log("Error name ",error.name);
        return next();
    }
    console.log("fetched payload is : ",fetchedData);
    req.user=fetchedData;
    next();
}


module.exports={
    checkUserLoggedInCookie,
    checkUserLoggedInHeader
}