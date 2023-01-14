
const express = require("express");
require('dotenv').config();
const { connection } = require("./configs/db")
const { UserRouter } = require("./routes/user.route");
const { NoteRouter } = require("./routes/note.route");
const { authenticate } = require("./middleware/authenticate.middleware");
var cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors({origin:"*"}))
app.get("/", (req, res) => {
    res.send("home page");
    console.log("Home page")
})


app.use("/user", UserRouter);
app.use(authenticate)
app.use("/notes", NoteRouter)



app.listen(process.env.port, async () => {

    try {
        await connection;
        console.log("database is connected")
    } catch (error) {
        console.log("error");
        console.log(error)
    }
    console.log(`server is runnig over ${process.env.port}`);
})