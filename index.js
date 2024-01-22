const express = require("express")
const { default: mongoose } = require("mongoose")

const { register, login, findUser } = require("./src/Controllers/authentication")
const cors = require("cors")
const { verifyToken, validateForm, isvalidated } = require("./src/Middlewares")
const { addForm } = require("./src/Controllers/forms")
const { sendEmail } = require("./src/Helper/Email")
const http = require("http")
const { Server } = require("socket.io")
const server = express()
const app = http.createServer(server)
const io = new Server(app)

server.use(express.json())
server.use(cors())
server.get("/",(req,res)=>{


//    res.send("Success")
    res.status(200).json({
        name:"kirti",
        age:4
    })
})

require('dotenv').config()
server.post("/register",register,sendEmail)
server.post("/login",login)
server.get("/get-user",verifyToken,findUser)

io.on("connection", socket => {
    console.log("new user connect");

    socket.on("message",(message,room)=>{
        console.log(`New message recieved in ${room} and message is ${message}`);
        socket.to(room).emit("message",message)
    })

    socket.on("join",(room) => {
        console.log(room);
        socket.join(room)
        socket.emit("joined")
    })
})


server.post("/addForm",validateForm,isvalidated,addForm)
app.listen("3000",() => {
    console.log("server started")
})

// for connecting database ,va
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database Connected")
    console.log("connected to port")
}).catch((error)=>{
    console.log(error)
})