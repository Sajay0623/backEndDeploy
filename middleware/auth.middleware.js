const jwt = require("jsonwebtoken")

const auth = (req, res, next)=>{
     const token = req.headers.auth
     if(token){
       const decoded =  jwt.verify(token , "masai")
      //  console.log(decoded.userID, "middle")
       req.body.userID = decoded.userID
       if(decoded){
        next()
       }else{
        res.send({msg:"please login first"})
       }
     }else{
        res.send({msg:"please login first"})
     }
}


module.exports = {auth}
