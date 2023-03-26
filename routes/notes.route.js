


const express = require("express")
 const jwt = require("jsonwebtoken")

const noteRouter = express.Router()
const {NoteModel} = require("../model/notes.module")

noteRouter.get("/", async (req, res)=>{
    const token = req.headers.auth
      let decoded = jwt.verify(token, "masai")
      if(decoded){
        let notes = await NoteModel.find({userID : decoded.userID})
          res.send(notes)
      }else{
        res.status(400).send({msg:"No note found from this user"})
      }
    //   try{
    //       let notes = await NoteModel.find({})
    //       res.send(notes)
    //   }catch(e){
    //     res.send({msg:e.message})
    //   }
})

noteRouter.post("/add", async (req, res)=>{
    let body = req.body
    // console.log(body.userID)
   try{
       let note = new NoteModel(body)
       await note.save()
       res.send({msg:"notes has been added"})
   }catch(err){
    res.send({msg:err.message})
   }
})


noteRouter.patch("/update/:id", async (req, res)=>{
       const {id} = req.params
       const payload = req.body
       try{
            let newnotes = await NoteModel.findByIdAndUpdate({_id:id} , payload)
             res.send({msg:`Notes has been updated ${newnotes}`})
       }catch(e){
        res.send({msg:e.message})
       }
})


noteRouter.delete("/delete/:id", async (req, res)=>{
    const token = req.headers.auth
    let decoded = jwt.verify(token, "masai")
    logedID = decoded.userID
    const {id} = req.params
     
    const note = await NoteModel.findOne({_id:id})



    // try{
    //      let newnotes = await NoteModel.findByIdAndDelete({_id:id})
    //       res.send({msg:`Notes with id: ${newnotes._id} has been deleted`})
    // }catch(e){
    //  res.send({msg:e.message})
    // }
})

module.exports = {noteRouter}