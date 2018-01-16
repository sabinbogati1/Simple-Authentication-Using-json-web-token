var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var userSchema = new Schema({
    firstName: String,
    lastName: String,
    address:String,
    user:{
            type:String,
            unique:true,
            required:true
    },
    password:String,
    email:{
        type:String,
        unique:true
    }
    
},{
    timestamps:true
});

var UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;