

const express=require("express");
const { UserModel } = require("../model/model.user")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();

const UserRouter=express.Router();

UserRouter.post("/register", async (req, res) => {
    const { name, email, age, pass } = req.body;
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            // Store hash in your password DB.
            if (err) {
                console.log(err)
            } else {
                const user = new UserModel({ name, email, age, pass: hash });
                await user.save();
                res.json("Registeration is done");
                console.log("Registeration is done");
            }
        });

    } catch (error) {
        console.log("error");
    }


})
UserRouter.post("/login", async (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    //console.log(req.body)
    try {
        const data = await UserModel.find({ email });
        const has_pass = data[0].pass;
       
        if (data.length > 0) {
            bcrypt.compare(pass, has_pass, (err, result) => {
                // result == false
                if (result) {
                    const token = jwt.sign({ userID: data[0]._id },process.env.key);
                  
                    res.json({ "msg": "login sucess", "token": token });
                    
                } else {
                    res.json("Wrong Credentials")
                }
            });

        } else {
            res.json("Wrong Credentials");
           
        }
    } catch (error) {
        console.log("error")
    }


})


module.exports={UserRouter}