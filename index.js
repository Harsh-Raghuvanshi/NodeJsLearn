//Imports
const express = require("express");
const cookieParser=require("cookie-parser");
const {establishConnectionWithMongo}=require("./connection.js");
const {logAllRequests}=require("./middlewares/logMiddleware.js");
const {router}=require("./routers/userRouter.js");
const {authRouter}=require("./routers/authenticationRouter.js");
const {externalRouter}=require("./routers/externalRouter.js");
const {internalRouter}=require("./routers/internalRouter.js");
const {checkUserLoggedInCookie,checkUserLoggedInHeader}=require("./middlewares/authMiddleware.js");
const {restrictOnlyToRoles}=require("./middlewares/accessMiddlware.js");
require("dotenv").config();


//Variables
const app = express();
const PORT = process.env.PORT;
const connectionString=process.env.DB_URL;
//Middlewares
//Inbuilt
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
//Custom
app.use(logAllRequests);
app.use(checkUserLoggedInHeader);

//DB connection
establishConnectionWithMongo(connectionString);

//User Router
app.use("/api/user",restrictOnlyToRoles([]),router);
app.use("/api/auth",restrictOnlyToRoles([]),authRouter);
app.use("/api/internal",restrictOnlyToRoles(["ADMIN","USER"]),internalRouter);
app.use("/api/external",restrictOnlyToRoles(["USER"]),externalRouter);

//Server Start
app.listen(PORT, () => { console.log(`Server is listening on Port ${PORT}`); });

