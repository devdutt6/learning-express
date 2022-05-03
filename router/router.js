// importing modules
const express = require("express");
const { authApis, loadUser, getRecord } = require("../controllers/api");
// initializing routers
const router = express.Router();
// importing models of mongoose for quering the database
const { User } = require("../modules/user");

// checking every request on path '/auth' with this middleware first it will check the authentication for api and then will load the user according to token data in real project
router.use('/', [authApis, loadUser]);

// the param functions which will run on every request with parameter declared as "Technology" in router and after running this only it will mount subpath
router.param('Technology', async ( req,res,next,Technology ) => {
    console.log("Entering param funtion with value %s", Technology);
    let user = await User.findOne({ Technology: Technology });
    if( !user ){
        return res.status(400).json({ messgae: `No we are not learning ${Technology}` });
    }
    req.user = user;
    next();
})

router.get('/getRecords/:Technology', getRecord);

module.exports = router;