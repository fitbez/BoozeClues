var db = require("../models");
var passport = require("../config/passport");
var localStrategy = require("passport-local").Strategy;
var express = require('express');
var router = express.Router();
    // Register
    router.get("/register", function(req, res) {
      res.render("register");
      });
      // // Login
      // router.get("/login", function(req, res) {
      //   res.render("login");
      //   });
        // Register user
        router.post("/register", function(req, res) {
          var name =req.body.name;
          var email =req.body.email;
          var username =req.body.username;
          var password =req.body.password;
          var access =req.body.access
          // var password2 = req.body.password2;
          // console.log(req)
          // console.log(req.body)

        // Validation

        req.checkBody('name','Name is required').notEmpty();
        req.checkBody('email','Email is required').notEmpty();
        req.checkBody('email','Email is not valid').isEmail();
        req.checkBody('username','Username is required').notEmpty();
        req.checkBody('password','password is required').notEmpty();
        req.checkBody('access','access is required').notEmpty();
        // req.checkBody('password2','paswords do not match').equals(req.body.password);

        var errors = req.validationErrors();
        if(errors.length > 0){
          console.log('===============there was an error======>')
          res.render('register',{
            errors:errors
          })
          req.flash('succes_msg', 'You are registered and can now login')
          
          }else {
           db.Users.create(req.body).then(function(user) {
             console.log('=================>', user)
              res.redirect("/login");
            }).catch(function(err) {
              console.log(err);
              res.json(err);
            });
          }
          });
       
      

module.exports = router;