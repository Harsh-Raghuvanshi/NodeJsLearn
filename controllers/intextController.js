

function handleInternalHome(req,res){
    res.status(200).json({message:"This is home page INTERNAL",user:req.x_user});
}
function handleInternalWork(req,res){
    res.status(200).json({message:"This is work page INTERNAL",user:req.x_user});
}
function handleExternalAbout(req,res){
    res.status(200).json({message:"This is about page EXTERNAL"});
}
function handleExternalContact(req,res){
    res.status(200).json({message:"This is contact page EXTERNAL"});
}
function ping(req,res){
    console.log("pinged ",req.url);
    return res.status(200).json({message:"PONG"});
}

module.exports={
    handleExternalAbout,
    handleExternalContact,
    handleInternalHome,
    handleInternalWork,
    ping
}