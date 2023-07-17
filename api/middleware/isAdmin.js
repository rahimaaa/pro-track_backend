
const {User} = require("../../db/models");


async function isAdmin(req, res, next){
    try{
        //const user = await User.findOne({where: {email: req.body.id}})
        const user = req.user;
        if(user.userType === "admin"){
            next()
        } else {
            res.status(403).send("You are not an admin")
        }
    } catch(error){
        next(error)
    }   

}

module.exports = {isAdmin: isAdmin,};