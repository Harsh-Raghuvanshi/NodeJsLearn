const http=require("http");
const express=require("express");
const {Server}=require("socket.io");
const path=require("path");
const app=express();
const PORT=8000;

const server=http.createServer(app);
const io=new Server(server);

app.get("/",(req,res)=>{
    return res.sendFile(path.join(__dirname,'./views/home.html'));
})

io.on('connection',(socket)=>{
    console.log("A client get connected",socket.id);
    socket.onAny((eventName,...arg)=>{
        console.log(`Event ${eventName} , Args : ${arg}`);
    });
    socket.on('chat message',(msg)=>{
        console.log(`From ${socket.id} , content : ${msg}`);
        io.emit('chat message',{message:msg,sender:socket.id});
    });
    socket.on('disconnect',()=>{
        console.log("Client disconnected",socket.id);
    });
})
server.listen(PORT,()=>{console.log(`Server is listening on ${PORT}`);})
