const express = require("express");
const router = express.Router();
const passport = require("passport");

// const userController = require("../controllers/users_controller");

// router.get("/signin", userController.signin);
// router.get("/signup", userController.signup);
// router.get("/signout", userController.destroySession);
// router.post("/create", userController.create);

// //use passport as a middleware to authenticate
// router.post(
//   "/create-session",
//   passport.authenticate("local", {
//     failureRedirect: "/users/signin",
//   }),
//   userController.createSession
// );
// router.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );
// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/users/signin" }),
//   userController.createSession
// );





router.get("/register",checkNotAuthenticated,(req,res)=>{
    res.render("register.ejs")
})


router.post("/register",checkNotAuthenticated,async (req,res)=>{
    try {
        const hashedPassword=await bcrypt.hash(req.body.password,10);
        users.push({
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword,
            confirmPassword:hashedPassword
        })
        res.redirect("/login");
    } catch (error) {
        console.log("error===>",error)

        res.redirect("/register");
    }
})


router.get("/login",checkNotAuthenticated,(req,res)=>{
    res.render("login.ejs")
})

router.post("/login",checkNotAuthenticated,passport.authenticate('local',{
    successRedirect:"/",
    failureRedirect:"/login",
    failureFlash:true
}))


router.get("/logout",(req,res)=>{
    res.render("logout.ejs")
})

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}
function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return  res.redirect("/")
    }
    next()
}
module.exports = router;