const express = require("express");
const jwt = require("jsonwebtoken")
const router = express.Router();
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt")
router.use("/register", async (req, res) => {
  const {email, pass , location, age} = req.body
  console.log(email);
  try {
    // const body = req.body;
    // const user = new UserModel(body);
    // await user.save();
    // res.send("registration has been done");

    bcrypt.hash(pass, 5, async (err, hash)=> {
      // Store hash in your password DB.
      const user = new UserModel({email, pass:hash, location, age});
       await user.save();
    res.send({msg:"registration has been done"});
  });

  } catch (err) {
    res.send({ msg: err.message });
  }
});

router.post("/login", async (req, res) => {
  const {email , pass}  = req.body
   
  try {
    const user = await UserModel.findOne({email})
       
      if(user){
        bcrypt.compare( pass, user.pass,  (err, result)=> {
          
          if(result){
            res.send({msg:"login has been done" ,"token":jwt.sign({ userID:user._id }, 'masai') })
          }else{
            res.send({ msg: "login Failed" })
          }
      });
    }
    } catch (err) {
    res.send({ msg: err.message });
  }
  
});

  router.get("/details", (req,res)=>{
    let token = req.headers.auth
    jwt.verify(token, 'shhhhh', (err, decoded)=> {
           decoded?res.send({msg:"login successfull"}) : res.send({msg:"Wrong Craditional"})
    });
   
  })
  // router.get("/", (req,res)=>{
  //   let token = req.headers
  //   jwt.verify(token, )
  //   try{

  //   }catch(err){
  //       res.send({ msg: err.message });
  //   }
  // })


module.exports = { router };
