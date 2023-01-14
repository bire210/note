const express = require("express");
const { NoteModel } = require("../model/model.note")
const NoteRouter = express.Router();

NoteRouter.get("/", async (req, res) => {
     //veryfication need
     try {
          
          const notes = await NoteModel.find();
          res.json(notes)
     } catch (error) {
          res.json("Somthing is wrong")
     }
})

NoteRouter.post("/create", async (req, res) => {
     //veryfication need
     const note = req.body;
     try {
          const subnote = new NoteModel(note);
          await subnote.save();
          res.json("Note is created")
     } catch (error) {
          console.log(error);
          res.json("something is wrong");
     }
})

NoteRouter.patch("/update/:id", async (req, res) => {

     const note = await NoteModel.findOne({ "_id": req.params.id });
     const userID_in_note = note.userID;
     const userID_Making_re = req.body.userID;
     try {
          if (userID_in_note != userID_Making_re) {
               res.json("You are note Authorise user")
          } else {
               await NoteModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
               res.json("Updated");
          }

     } catch (error) {
          res.json("Something is wrong");
          console.log(error)
     }

})

NoteRouter.delete("/delete/:id", async (req, res) => {
     const note = await NoteModel.findOne({ "_id": req.params.id });
     const userID_in_note = note.userID;
     const userID_Making_re = req.body.userID;
     try {
          if (userID_in_note != userID_Making_re) {
               res.json("You are note Authorise user")
          } else {
               await NoteModel.findByIdAndDelete({ _id: req.params.id });
               res.json("Deleted");
          }

     } catch (error) {
          res.json("Something is wrong");
          console.log(error)
     }


})


module.exports = { NoteRouter }