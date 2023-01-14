const mongoose=require("mongoose");
const noteScema=mongoose.Schema({
    title:String,
    note:String,
    category:String,
    userID:String
})

const NoteModel=mongoose.model("note",noteScema);
module.exports={NoteModel}