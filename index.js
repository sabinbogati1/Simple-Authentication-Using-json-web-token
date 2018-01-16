var express = require("express");
var bodyParser = require('body-parser');
var userRoute = require("./routes/user")();
var authRoute = require("./routes/auth")();

var authenticate = require("./middlewares/authentication");

var app = express();

//Calling database Connection
require("./db")();



app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());


app.get("/", function(req,res){
    res.send("Hello");
});

app.use("/user",authenticate,userRoute);
app.use("/auth",authRoute);





app.use(function(err,req,res,next){
    res.status(500);
    res.json(err.message || err);
    
})

app.listen(8080,"127.0.0.1", function(err,done){
    if(err){
        console.log("Error occured ", err );
    }
    else{
        console.log("Server Running at port 8080");
    }
})