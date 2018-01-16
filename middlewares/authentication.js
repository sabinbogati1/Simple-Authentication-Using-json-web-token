var jwt = require("jsonwebtoken");


module.exports = function (req, res, next) {

    // console.log('here here here');


    var token;

    // if (req.headers['x-access-token']) {
    //     token = req.headers['x-access-token'];
    // }
    // console.log('token is token here',req.headers);

    if (req.headers['authorization']){
        token = req.headers['authorization']
    }
       
    // if (req.query.token)
    //   token = req.query.token;



    if (token) {

        var validUser = jwt.verify(token, "secret");
        // console.log("validUser", validUser);
        if (validUser) {
            req.user = validUser.user;
            return next();
        }
        else {
            return next({
                status: 403,
                message: "Invalid Token or token expired"
            });
        }


    }
    else {
        return next({
            stauts: 403,
            message: "TOken not Provided"
        });
    }

}