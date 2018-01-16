var express = require("express");

var router = express.Router();

var jwt = require("jsonwebtoken");


function createToken(data) {
	var token = jwt.sign({
		_id: data._id,
		firstName: data.firstName
	}, "secret",{
        expiresIn: "2h"
    });

    return token;
}





var UserModel = require("./../models/users");

module.exports = function() {

	router.get('/', function(req, res) {
		res.send('You are inside Auth');
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

                        var token = createToken(user);

                    res.json({
                        user:user,
                        toekn:token
                    });
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


















