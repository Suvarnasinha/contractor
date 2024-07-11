const express =require("express");
const app = express();
const bodyParser=require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const dataRoutes = require("./router/router.js")
const router = express.Router();
var cors = require('cors')
const cookieParser = require('cookie-parser');
const path = require('path');
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
    credentials:true,
    methods:['GET','POST'],
    transports:['WebSocket','Pooling'],
    allowEIO4:true,
  }
})
console.log("io",io)
app.use(cookieParser());
var corsOptions = {
  origin:'http://localhost:8080',
  credentials: true,
 };
  app.use(cors(corsOptions));
  console.log("crs",corsOptions)
require('dotenv').config();
app.set("view engine", "ejs");
router.use(express.json())
app.use("/", dataRoutes);
app.use(express.static(path.join(__dirname,('public'))))


io.on("connection", (socket) => {
  //Create of socket
  console.log(`New client connected ${socket.id}`);

  socket.on("sendMessage", (message) => {
    console.log("objecsend message t",message);
    // Broadcast the message to all clients here only
    io.emit("receiveMessage", message);
    console.log("message",message)
  });

  socket.on("disconnect", () => {
    //delete the socket
    console.log(`Client disconnected ${socket.id}`);
  });
});



server.listen(process.env.PORT || 3000, () => {
  console.log("Running at Port 3000");
});
