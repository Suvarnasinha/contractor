const express =require("express");
const app = express();
const bodyParser=require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const dataRoutes = require("./router/router.js")
const router = express.Router();
var cors = require('cors')
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors())
require('dotenv').config();
app.set("view engine", "ejs");
router.use(express.json())
app.use("/", dataRoutes);
app.listen(process.env.PORT || 3000, () => {
  console.log("Running at Port 3000");
});
