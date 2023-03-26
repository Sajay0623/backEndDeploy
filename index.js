const express = require("express")
const {connection} = require("./db")
const app = express()
const {router} = require("./routes/user.routes")
app.use(express.json())
const {noteRouter} = require("./routes/notes.route")
const {auth} = require("./middleware/auth.middleware")
const cors = require("cors")
require("dotenv").config()
app.use(cors())
// rregistration
// app.post("/register",(req, res)=>{
//     res.send("registration has been done")
// })
// //login
// app.post("/login", (req, res)=>{
// res.send("login done")
// })

app.use("/user" , router)
// app.use(auth)
app.use("/note" ,auth , noteRouter)

app.listen(process.env.port, async ()=>{
  try{
    await connection
    console.log("db connected");
    console.log(`app is running on port ${process.env.port}`);
  }catch(err){
    console.log("err")
  }
})

// mongodb://127.0.0.1:27017/