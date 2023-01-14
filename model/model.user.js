const mongoose=require("mongoose");

const userSchma=mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    age:Number
})

const UserModel=mongoose.model("user",userSchma);
module.exports={
    UserModel
}