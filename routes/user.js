var express = require("express");

var router = express.Router();

var UserModel = require("./../models/users");

module.exports = function() {

	router.get('/', function(req, res) {
		res.send('You are inside User');
    });


    router.get('/allUser', function(req, res) {
		res.send('You got All the User');
    });
    

    router.post("/signup", function(req,res,next){

        var newUser = new UserModel();
        newUser.firstName=req.body.firstName;
        newUser.lastName=req.body.lastName;
        newUser.address=req.body.address;
        newUser.user=req.body.user;
        newUser.password=req.body.password;
        newUser.email=req.body.email;
        newUser.save(function(err, savedUser){
                if(err){
                    return next(err);
                }
                else{
                    console.log("User Succesfully saved to database");
                    res.json(savedUser);
                }
        });
    });


    router.post("/login", function(req,res,next){

            UserModel.find({
                user:req.body.user,
                password:req.body.password
            }, function(err,user){
                if(err){
                    return next(err);
                }
                if(user){
                    res.json(user);
                }
                else{
                    res.json({
                        message: "User Not Found"
                    });
                }
            })


    });


    return router;

}


















