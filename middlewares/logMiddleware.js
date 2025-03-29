const fs=require("fs");
const request_ip = require("request-ip");


function logAllRequests(req,res,next){
    const log=`\ntime : ${Date.now()}, req path : ${req.url}, method : ${req.method}, ip address : ${request_ip.getClientIp(req)}  `
    fs.appendFile("./log.txt",log,(err)=>{
        if(err)console.log("Error while appending LOG data in file");
    })
    next();
}

module.exports={
    logAllRequests
}