const mongoose=require("mongoose");

const signUpSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    college:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true
    }
})

const signUpModel=mongoose.model("signUpData",signUpSchema);

module.exports={
    signUpModel
}