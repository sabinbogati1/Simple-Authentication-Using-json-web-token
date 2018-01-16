var mongoose = require("mongoose");
var db_url= "mongodb://127.0.0.1:27017/homepractise";

module.exports = function(){


    mongoose.connect(db_url);


    mongoose.connection.on("error", function(err){
        console.log("Error occured while connecting to db");
    });

    mongoose.connection.once("open", function(done){
        console.log("Succesfully Connected to database using .once .open");
    });




}