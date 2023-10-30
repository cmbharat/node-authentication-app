require('dotenv').config();
const express =require("express");
const app=express();
const bcrypt=require("bcrypt")
const passport=require("passport")
const flash=require("express-flash");
const session=require("express-session")
const GoogleStrategy=require("passport-google-oauth").OAuth2Strategy;


const initializePassport=require("./config/passport-local")
initializePassport(passport,
    email=>users.find(user=> user.email===email),
    id=>users.find(user=> user.id===id));

//use express router
app.use("/", require("./routes"));

app.set("view-engine",'ejs');
const users=[];
app.use(express.urlencoded({extended:false}))
app.use(flash());
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());

app.listen(3000);