const { User } = require('../modules/user');

exports.openApis = async (req,res) => {
    try{
        let user = await User.create({ firstName: "Developer", Technology: "Express" });
        res.status(200).send( `<div><p>The secret to pass in Header Field 'Bearer Token' is <strong>Learning</strong> and your name is ${user.firstName}, and Technology is ${user.Technology}</p></div>` );
        // next();
    }
    catch(err){
        console.log(err);
        return res.status(500).send("<h1>500</h1><br><p>Internal Server Error!</p>");
    }
}

exports.authApis = async (req,res, next) => {
    try{
        console.log("AUTH");
        let token = req.headers.authorization;

        if(!token){
            return res.status(401).send('<h2>please provide header field Bearer token</h2>');
        }
        else{
            token = token.split(' ')[1];
            if( token === "Learning" ){
                /**if true block */
                next();
            }else{
                return res.status(401).send('<h2>please provide header field Bearer token like Bearer placeyourtokenhere');
            }
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send("<h1>500</h1><br><p>Internal Server Error!</p>");
    }
}

exports.loadUser = async (req,res, next) => {
    try{
        console.log('LOAD');

        /**
         * Place your code for loading some user
         */
        next();
    }
    catch(err){
        console.log(err);
        return res.status(500).send("<h1>500</h1><br><p>Internal Server Error!</p>");
    }
}


exports.getRecord = async (req,res) => {
    try{
        let user = req.user;

        return res.status(200).send(`<h2>Name and Technology</h2><br><p>${ user.firstName} and ${ user.Technology }</p>`);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("<h1>500</h1><br><p>Internal Server Error!</p>");
    }
}