const router = require("express").Router();
const { User } = require("../db/models");
//auth/login
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !user.correctPassword(req.body.password)) {
      res.status(401).send("Invalid login attempt");
    } else {
      req.login(user, (err) => (err ? next(err) : res.status(200).json(user)));
    }
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next)=>{
    try{
        const {email, password} = req.body;
       if(!email || !password){
        return res.status(400).send("Required fields missing")
       }
       const user = await User.create(res.body);
       req.login(user, (err) => (err ? next(err) : res.status(200).json(user)));
    } catch(error){
        if(error.name=== "SequelizeUniqueConstraintError"){
            res.status(409).send("User already exists")
        } else {
            next(error);
        }
    }
})

router.post('/logout', async ( req,res,next)=> {
req.logout((err) => {
    if(error){
        return next(error);
    }
    res.redirect("/")
})
})

router.get('/me', async (req, res, next)=> {
    res.status(200).json(req.user);
})

module.exports = router;
