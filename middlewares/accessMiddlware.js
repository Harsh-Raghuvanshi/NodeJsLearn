

function restrictOnlyToRoles(roles=[]){
    return (req,res,next)=>{
        const user=req.user;
        if(roles.length==0){
            // it means all traffic is allowed;
            return next();
        }
        if(!user || !user.role){
            return res.redirect("http://localhost:8000/api/auth/v2/signin");
        }
        const role=user.role;
        if(!roles.includes(role)){
            return res.redirect("http://localhost:8000/api/auth/v2/signin")
        }
        next();
    }
}

module.exports={
    restrictOnlyToRoles
}