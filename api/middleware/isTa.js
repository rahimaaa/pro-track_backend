
const {User} = require("../../db/models");


async function isTA (req, res, next){
    try{
        //const user = await User.findOne({where: {email: req.body.id}})
        const user = req.user;
        if(user.userType === "TA" || user.userType === "admin"){
            next()
        } else {
            res.status(403).send("You are not a TA")
        }
    } catch(error){
        next(error)
    }   

}

module.exports = {isTA: isTA,};