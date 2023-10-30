const User = require("../models/user");
// const fs = require("fs");
const { Parser } = require("json2csv");
const fs = require("@cyclic.sh/s3fs");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("sign_in", {
    title: "Sign In",
  });
};
module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("sign_up", {
    title: "Sign Up",
  });
};

module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    const newUser = await User.create(req.body);
    return res.redirect("/users/signin");
  } else {
    return res.redirect("back");
  }
};

//sign in and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

//sign out
module.exports.destroySession = function (req, res, next) {
  //function provided by passport
  req.logout(function (err) {
    if (err) {
      console.log("erorr===", err);
      return next(err);
    } else res.redirect("/users/signin");
  });
  // return res.redirect("/users/signin");
};
