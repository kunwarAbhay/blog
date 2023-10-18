const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const router = express.Router()
const authRoute = require("./routers/auth");
const storyRoute = require("./routers/story");
const userRoute = require("./routers/user");
const commentRoute = require("./routers/comment");


const connectDB = require("./Helpers/database/connectDB");
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler");

dotenv.config();

connectDB();

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json())
app.use(cors())

app.use("/auth",authRoute)
app.use("/story",storyRoute)
app.use("/user",userRoute)
app.use("/comment",commentRoute)

// this line we add to make react router work in case of other routes doesnt match
app.get('*', (req, res) =>
  res.sendFile(path.join('build', 'index.html'))
);

app.use(customErrorHandler)

const PORT = process.env.PORT || 5000 ;

const server = app.listen(PORT,()=>{
    console.log(`Server running on port  ${PORT} : ${process.env.NODE_ENV}`)
})

process.on("unhandledRejection",(err , promise) =>{
    console.log(`Logged Error : ${err}`)
    server.close(()=>process.exit(1))
})